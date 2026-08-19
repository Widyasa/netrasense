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
        uint64 validatedAt;
        Status status;
    }

    mapping(bytes32 => Batch) public batches;

    event BatchSubmitted(bytes32 indexed batchId, bytes32 dataHash);
    event BatchValidated(bytes32 indexed batchId, address[] witnesses);

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
}
