const {
  getJobs,
  postJob,
  getJobById,
  deleteJobById,
  patchJobById,
} = require("./job.controller");
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

describe("postJob", () => {
  it("should successfully save item in to Database", async () => {
    jest
      .spyOn(JobModel.prototype, "save")
      .mockImplementationOnce(() => Promise.resolve(mockedJob));

    const mockH = {
      response: jest.fn().mockImplementationOnce((newJob) => {
        if (newJob) {
          return {
            code: jest.fn().mockResolvedValue(httpResp(mockedJob, 201)),
          };
        }
      }),
    };

    const res = await postJob(
      {
        payload: {
          contactEmail: "tomekand1@gmail.com",
          id: "80d411f5-bfe5-4213-a819-858a9b17c971",
          priceInPence: 9900,
          status: "COMPLETED",
          type: "SHIFT",
          updatedAt: null,
        },
      },
      mockH
    );

    expect(res.data).toEqual(mockedJob);
    expect(res.statusCode).toEqual(201);
  });
  it("should throw panic error when db throws", async () => {
    jest
      .spyOn(JobModel.prototype, "save")
      .mockImplementationOnce(() => Promise.reject(dbError));

    await await expect(postJob()).rejects.toThrow();
  });
});

describe("getJobById", () => {
  beforeEach(() => {
    JobModel.find = jest.fn().mockImplementationOnce(({ id }) => {
      if (id === mockedJob.id) {
        return [mockedJob];
      } else {
        return [];
      }
    });
  });
  it("should fetch item from database by id", async () => {
    const res = await getJobById({
      params: { id: "80d411f5-bfe5-4213-a819-858a9b17c971" },
    });

    expect(res).toEqual(mockedJob);
  });

  it("should an error when no data found ", async () => {
    const id = "80d411f5-bfe5-4213-a819-858a9b17c972";
    await expect(
      getJobById({
        params: { id },
      })
    ).rejects.toThrow(new Error(`No item found for id: ${id}`));
  });
});

describe("deleteJobById", () => {
  beforeEach(() => {
    JobModel.deleteOne = jest.fn().mockImplementationOnce(({ id }) => {
      if (id === "80d411f5-bfe5-4213-a819-858a9b17c971") {
        return { deletedCount: 1 };
      } else {
        return { deletedCount: 0 };
      }
    });
  });
  it("should delete item from database", async () => {
    const mockH = {
      response: jest.fn().mockImplementationOnce((val) => {
        if (val) {
          return {
            code: jest.fn(val).mockResolvedValue({ data: val, code: 204 }),
          };
        }
      }),
    };
    const res = await deleteJobById(
      {
        params: { id: "80d411f5-bfe5-4213-a819-858a9b17c971" },
      },
      mockH
    );

    expect(res).toEqual(
      "Item id: 80d411f5-bfe5-4213-a819-858a9b17c971 has been successfully deleted"
    );
  });
  it("should return 204 status code if no item found for delete", async () => {
    const mockH = {
      response: jest.fn().mockImplementationOnce((val) => {
        if (!val) {
          return {
            code: jest.fn(val).mockResolvedValue({ code: 204 }),
          };
        }
      }),
    };
    const id = "80d411f5-bfe5-4213-a819-858a9b17c972";
    const res = await deleteJobById(
      {
        params: { id: id },
      },
      mockH
    );

    expect(res.code).toEqual(204);
  });
});

describe("patchJobById", () => {
  beforeEach(() => {
    JobModel.updateOne = jest.fn().mockImplementationOnce(({ id }, payload) => {
      const validateRequestPayload = (obj) => {
        return Object.keys(obj).length > 1;
      };
      if (
        id === "80d411f5-bfe5-4213-a819-858a9b17c971" &&
        validateRequestPayload(payload)
      ) {
        return { matchedCount: 1 };
      } else {
        return { matchedCount: 0 };
      }
    });
  });
  it("should update an item in database", async () => {
    const mockH = {
      response: jest.fn().mockImplementationOnce((val) => {
        if (val) {
          return {
            code: jest.fn().mockResolvedValue(),
          };
        }
      }),
    };

    const res = await patchJobById(
      {
        params: { id: "80d411f5-bfe5-4213-a819-858a9b17c971" },
        payload: { status: "COMPLETED" },
      },
      mockH
    );

    expect(res).toEqual(
      "Item id: 80d411f5-bfe5-4213-a819-858a9b17c971 has been successfully updated"
    );
  });
});
