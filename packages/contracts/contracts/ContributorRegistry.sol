// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ContributorRegistry {
    enum Tier { Newcomer, Verified, Validator }

    struct Contributor {
        uint16 reputation;
        uint32 validatedPoints;
        uint32 rejectedPoints;
        uint256 stakedAmount;
        Tier tier;
    }

    mapping(address => Contributor) public contributors;

    function register(address contributor) external {
        require(contributors[contributor].reputation == 0, "registered");
        contributors[contributor] = Contributor({
            reputation: 0,
            validatedPoints: 0,
            rejectedPoints: 0,
            stakedAmount: 0,
            tier: Tier.Newcomer
        });
    }

    function recordValidation(address contributor, uint32 points) external {
        Contributor storage c = contributors[contributor];
        c.validatedPoints += points;
        c.reputation = _computeReputation(c);
        c.tier = _computeTier(c);
    }

    function _computeReputation(Contributor storage c) private view returns (uint16) {
        uint32 total = c.validatedPoints + c.rejectedPoints;
        if (total == 0) return 0;
        return uint16((c.validatedPoints * 1000) / total);
    }

    function _computeTier(Contributor storage c) private view returns (Tier) {
        if (c.validatedPoints >= 500 && c.reputation >= 920 && c.stakedAmount > 0) return Tier.Validator;
        if (c.validatedPoints >= 50 && c.reputation >= 800) return Tier.Verified;
        return Tier.Newcomer;
    }
}
