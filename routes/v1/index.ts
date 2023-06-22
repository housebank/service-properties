import {type FastifyInstance, type FastifyListenOptions} from "fastify";
import { deleteById, updateById, insertNew, queryById, queryAll } from "../../controllers/v1";

const getAllEndpoint = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: queryAll,
};

const getByIdEndpoint = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: queryById,
};

const createNewEndpoint = {
  schema: {
    body: { type: "array", items: {type: "object", properties:{
          property_type: { type: "string" },
          description: { type: "string" },
          address: {type: "array", items: {type: "string"}, maxItems: 999},
          media: {type: "array", items: {type: "number"}, maxItems: 999},
          city: { type: "string" },
          country: { type: "string" },
          price: { type: "number" },
          availability: { type: "boolean" },
          verified: { type: "boolean" },
          owner_id: { type: "number" },
          size: { type: "string" },
          bedrooms:{ type: "number" },
          bathrooms: { type: "number" },
          amenities: {type: "array", items: {type: "string"}, maxItems: 999},
          rating_id: { type: "number" },
          reviews: {type: "array", items: {type: "string"}, maxItems: 999},
          bookings: {type: "array", items: {type: "number"}, maxItems: 999},
          listed_by: { type: "number" },
          tags: {type: "array", items: {type: "string"}, maxItems: 999},
        }}, maxItems: 999},
    response: {
      201: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: insertNew,
};

const updateByIdEndpoint = {
  schema: {
    params:{
      type: "object",
      properties: {
        id:{type: "integer"}
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: updateById,
};

const deleteByIdEndpoint = {
  schema: {
    params:{
      type: "object",
      properties: {
        id:{type: "integer"}
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          version: { type: "string" },
          data: {type: "array"},
          status: { type: "integer" }
        }
      },
      401: {
        type: "object",
        properties: {
          version: { type: "string" },
          error: {type: "string"},
          status: { type: "integer" }
        }
      },
    },
  },
  handler: deleteById,
};

function serviceRoutes(
  fastify: FastifyInstance,
  options: FastifyListenOptions,
  done: any
) {
  const _serviceName = process.env.SERVICE_NAME;

  fastify.get("/v1/" + _serviceName, getAllEndpoint);
  fastify.get("/v1/" + _serviceName + "/:id", getByIdEndpoint);
  fastify.post("/v1/" + _serviceName, createNewEndpoint);
  fastify.patch("/v1/" + _serviceName + "/:id", updateByIdEndpoint);
  fastify.delete("/v1/" + _serviceName + "/:id", deleteByIdEndpoint);
  done();
}

export default serviceRoutes;
