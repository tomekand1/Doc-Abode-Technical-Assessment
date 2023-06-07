const { getJobs } = require("./job.controller");
const JobModel = require("../model/model");
jest.mock("../model/model");

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
    Job.find = jest.fn().mockImplementationOnce(() => ({
      sort: jest.fn().mockResolvedValue(httpResp(mockedJob)),
    }));

    const res = await getJobs();

    expect(res).toEqual({
      statusCode: 200,
      data: mockedJob,
    });
  });
});