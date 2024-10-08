// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract AttendanceTracker {
    struct AttendanceRecord {
        bool isPresent;
        uint256 timestamp;
        string metadata;
    }

    mapping(address => mapping(uint256 => AttendanceRecord))
        public attendanceRecords;
    mapping(uint256 => address[]) public presentParticipants;

    event AttendanceMarked(
        address indexed participant,
        uint256 indexed date,
        bool isPresent,
        string metadata
    );

    function markAttendance(
        uint256 date,
        bool isPresent,
        string memory metadata
    ) public {
        attendanceRecords[msg.sender][date] = AttendanceRecord(
            isPresent,
            block.timestamp,
            metadata
        );
        emit AttendanceMarked(msg.sender, date, isPresent, metadata);
    }

    function getAttendance(
        address participant,
        uint256 date
    )
        public
        view
        returns (bool isPresent, uint256 timestamp, string memory metadata)
    {
        AttendanceRecord memory record = attendanceRecords[participant][date];
        return (record.isPresent, record.timestamp, record.metadata);
    }

    function getPresentParticipants(
        uint256 date
    ) public view returns (address[] memory) {
        return presentParticipants[date];
    }

    function removeParticipant(uint256 date, address participant) internal {
        address[] storage participants = presentParticipants[date];
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == participant) {
                participants[i] = participants[participants.length - 1];
                participants.pop();
                break;
            }
        }
    }
}
