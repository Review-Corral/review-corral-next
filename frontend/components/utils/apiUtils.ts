import axios from "axios";
import * as nJwt from "njwt";
import { InstallationAccessResponse } from "../../../frontend/github-types";

export function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[],
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}

export async function getJwt(): Promise<nJwt.Jwt> {
  const now = Math.floor(Date.now() / 1000) - 30;
  const expiration = now + 120; // JWT expiration time (10 minute maximum)

  if (!process.env.GITHUB_APP_ID) {
    throw Error("GITHUB_APP_ID not set");
  }
  if (!process.env.GITHUB_APP_JWT_SIGNING_SECRET) {
    throw Error("GITHUB_APP_JWT_SIGNING_SECRET not set");
  }

  const claims = {
    // issued at time, 60 seconds in the past to allow for clock drift
    iat: now,
    // JWT expiration time (10 minute maximum)
    exp: expiration,
    iss: process.env.GITHUB_APP_ID,
  };

  const jwt = nJwt.create(
    claims,
    Buffer.from(process.env.GITHUB_APP_JWT_SIGNING_SECRET, "base64"),
    "RS256",
  );

  return jwt.setExpiration(new Date().getTime() + 60 * 2);
}

export async function getInstallationAccessToken(
  installationId: number,
  jwt?: nJwt.Jwt,
): Promise<InstallationAccessResponse> {
  const jwtToken = jwt || (await getJwt());

  return (
    await axios.post<InstallationAccessResponse>(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      null,
      {
        headers: { Authorization: `Bearer ${jwtToken.compact()}` },
      },
    )
  ).data;
}
