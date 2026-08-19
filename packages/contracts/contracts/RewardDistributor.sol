// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAttestationRegistry {
    enum Status { Provisional, Validated, Disputed, Expired }
    struct Batch {
        bytes32 dataHash;
        string storageCID;
        bytes8 geohashPrefix;
        uint32 pointCount;
        address[] witnesses;
        uint64 submittedAt;
        uint64 validatedAt;
        Status status;
    }
    function getBatch(bytes32 batchId) external view returns (Batch memory);
}

contract RewardDistributor {
    IAttestationRegistry public attestationRegistry;
    mapping(address => uint256) public pending;
    mapping(address => uint256) public claimed;

    event RewardRecorded(address indexed contributor, bytes32 indexed batchId, uint256 amount);
    event RewardClaimed(address indexed contributor, uint256 amount);

    constructor(address _attestationRegistry) {
        attestationRegistry = IAttestationRegistry(_attestationRegistry);
    }

    function recordReward(bytes32 batchId, address contributor) external {
        IAttestationRegistry.Batch memory batch = attestationRegistry.getBatch(batchId);
        require(batch.status == IAttestationRegistry.Status.Validated, "not validated");
        uint256 amount = uint256(batch.pointCount) * 1 ether;
        pending[contributor] += amount;
        emit RewardRecorded(contributor, batchId, amount);
    }

    function pendingOf(address contributor) external view returns (uint256) {
        return pending[contributor];
    }

    function claimedOf(address contributor) external view returns (uint256) {
        return claimed[contributor];
    }

    function claim() external {
        uint256 amount = pending[msg.sender];
        require(amount > 0, "nothing to claim");
        pending[msg.sender] = 0;
        claimed[msg.sender] += amount;
        emit RewardClaimed(msg.sender, amount);
    }
}
