// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AttestationRegistry {
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

    mapping(bytes32 => Batch) public batches;

    uint64 public constant EXPIRY_SECONDS = 180 days;

    event BatchSubmitted(bytes32 indexed batchId, bytes32 dataHash);
    event BatchValidated(bytes32 indexed batchId, address[] witnesses);
    event BatchDisputed(bytes32 indexed batchId, string reason);
    event BatchExpired(bytes32 indexed batchId);

    function submitBatch(
        bytes32 batchId,
        bytes32 dataHash,
        string calldata storageCID,
        bytes8 geohashPrefix,
        uint32 pointCount
    ) external {
        require(batches[batchId].status == Status.Provisional && batches[batchId].dataHash == 0, "exists");
        batches[batchId] = Batch({
            dataHash: dataHash,
            storageCID: storageCID,
            geohashPrefix: geohashPrefix,
            pointCount: pointCount,
            witnesses: new address[](0),
            submittedAt: uint64(block.timestamp),
            validatedAt: 0,
            status: Status.Provisional
        });
        emit BatchSubmitted(batchId, dataHash);
    }

    function attest(bytes32 batchId, address witness) external {
        Batch storage batch = batches[batchId];
        require(batch.dataHash != 0, "not found");
        require(batch.status == Status.Provisional, "not provisional");
        batch.witnesses.push(witness);
        if (batch.witnesses.length >= 1) {
            batch.status = Status.Validated;
            batch.validatedAt = uint64(block.timestamp);
            emit BatchValidated(batchId, batch.witnesses);
        }
    }

    function dispute(bytes32 batchId, string calldata reason) external {
        Batch storage batch = batches[batchId];
        require(batch.dataHash != 0, "not found");
        require(batch.status == Status.Provisional || batch.status == Status.Validated, "cannot dispute");
        batch.status = Status.Disputed;
        emit BatchDisputed(batchId, reason);
    }

    function expire(bytes32 batchId) external {
        Batch storage batch = batches[batchId];
        require(batch.dataHash != 0, "not found");
        require(batch.status == Status.Provisional, "cannot expire");
        require(block.timestamp >= batch.submittedAt + EXPIRY_SECONDS, "not expired");
        batch.status = Status.Expired;
        emit BatchExpired(batchId);
    }

    function getBatch(bytes32 batchId) external view returns (Batch memory) {
        return batches[batchId];
    }
}
