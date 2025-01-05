/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "AuthRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "GithubClientId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "GithubClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "MyAuth": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "api": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "frontend": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "main": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
