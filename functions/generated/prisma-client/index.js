"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Gender",
    embedded: false
  },
  {
    name: "FundType",
    embedded: false
  },
  {
    name: "FundStatus",
    embedded: false
  },
  {
    name: "Auth",
    embedded: false
  },
  {
    name: "SocialMedia",
    embedded: false
  },
  {
    name: "PersonalDetail",
    embedded: false
  },
  {
    name: "Application",
    embedded: false
  },
  {
    name: "FinanceOption",
    embedded: false
  },
  {
    name: "FundRange",
    embedded: false
  },
  {
    name: "NextOfKinDetail",
    embedded: false
  },
  {
    name: "BusinessDetail",
    embedded: false
  },
  {
    name: "FundDetail",
    embedded: false
  },
  {
    name: "Industry",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/ernest-hayford-4ed24c/Consol/dev`
});
exports.prisma = new exports.Prisma();
