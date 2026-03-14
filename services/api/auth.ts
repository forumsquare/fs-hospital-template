import { apiEndpoints, StatusCode } from "@/constants/api";
import { auth } from "@/lib/firebase";
import { setCookie } from "@/lib/serverCom";
import { apiInstance, handleErr, setAccessToken } from "@/lib/utils";
import { APISnapshotType } from "@/models/types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const oauthIdToken = credential?.idToken;

    console.log({ user, result, credential });
    if (user && oauthIdToken) {
      const response = await apiInstance.post<APISnapshotType>(
        apiEndpoints.auth.signInWithGoogle,
        {
          provider: "GOOGLE",
          idToken: oauthIdToken
        }
      );
      console.log({ response });
      if (response.data.status === StatusCode.OK) {
        // Store the access token from response
        const accessToken = response.data.data.accessToken;
        setAccessToken(accessToken);
        const userInfo = response.data.data.userInfo;
        console.log({ userInfo });
        await setCookie("userInfo", JSON.stringify(userInfo));

        const refreshToken = response.data.data.refreshToken;
        await setCookie("refreshToken", refreshToken);

        return response.data;
      }
      throw response.data.message;
    }
    throw "No user found";
  } catch (error) {
    throw handleErr(error);
  }
};

export const signInWithTemplate = async (phoneNo: string) => {
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.auth.templateSignin,
      {
        phoneNo
      }
    )
    console.log({ response });
    if (response.data.status === StatusCode.OK) {
      return response.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
}

export const verifyTemplateOtp = async (phoneNo: string, otp: string) => {
  try {
    const response = await apiInstance.post<APISnapshotType>(
      apiEndpoints.auth.verifyTemplateOtp,
      {
        phoneNo,
        otp
      }
    )
    console.log({ response });
    if (response.data.status === StatusCode.OK) {
      const accessToken = response.data.data.accessToken;
      setAccessToken(accessToken);
      const userInfo = response.data.data.userInfo;
      console.log({ userInfo });
      await setCookie("userInfo", JSON.stringify(userInfo));

      const refreshToken = response.data.data.refreshToken;
      await setCookie("refreshToken", refreshToken);

      return response.data;
    }
    throw response.data.message;
  } catch (error) {
    throw handleErr(error);
  }
}