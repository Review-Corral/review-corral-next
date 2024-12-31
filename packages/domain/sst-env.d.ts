/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Auth": {
      "type": "sst.aws.Auth"
      "url": string
    }
    "AuthApi": {
      "name": string
      "type": "sst.aws.Function"
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
    "api": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "main": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
