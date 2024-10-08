import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Attendance Contract", () => {
  async function deployContractFixture() {
    const [owner, participant] = await ethers.getSigners()
    const contractFactory = await ethers.deployContract("AttendanceTracker")
    const attendanceTracker = contractFactory.target

    return { owner, participant, contractFactory, attendanceTracker }
  }

  it("should mark attendance", async () => {
    const { owner, contractFactory } = await loadFixture(deployContractFixture)

    const epochTime = Date.now()

    await contractFactory.markAttendance(epochTime, true, "test")
    const result = await contractFactory.getAttendance(owner.address, epochTime)

    expect(result[0]).to.equal(true)
  })
})
