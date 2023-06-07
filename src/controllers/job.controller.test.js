const { getJobs } = require("./job.controller");
const JobModel = require("../models/model");
jest.mock("../models/model");

const mockedJob = {
  contactEmail: "tomekand1@gmail.com",
  createdAt: " 2023-06-06T22:58:45.829Z",
  id: "80d411f5-bfe5-4213-a819-858a9b17c971",
  priceInPence: 9900,
  status: "COMPLETED",
  type: "SHIFT",
  updatedAt: null,
};

const httpResp = (data, statusCode = 200) => {
  return {
    data,
    statusCode,
  };
};

describe("getJobs", () => {
  it("should fetch items from database", async () => {
    JobModel.find = jest.fn().mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue(httpResp([mockedJob])),
    }));

    const res = await getJobs();

    expect(res).toEqual({
      statusCode: 200,
      data: [mockedJob],
    });
  });
  // this is a default behavior
  it("should throw panic error when db throws", async () => {
    JobModel.find = jest.fn().mockImplementationOnce(() => ({
      sort: jest.fn().mockRejectedValue(dbError),
    }));

    await await expect(getJobs()).rejects.toThrow();
  });
  it("should return an empty array when items not found and status code 200", async () => {
    JobModel.find = jest.fn().mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue(httpResp([])),
    }));

    const res = await getJobs();

    expect(res).toEqual({
      statusCode: 200,
      data: [],
    });
  });
});
