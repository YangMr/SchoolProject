/**
 * @author YangLing
 * @date 2021/12/11 1:56 PM
 */

import request from "../utils/request";
import * as Qs from "querystring"

export const uploadSingle = (fileData, callback) => {
  return request({
    url: "/upload_single",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total;
      callback(loaded, total);
    },
    data: fileData,
  });
};

export const uploadSingleBase64 = (fileData) => {
  return request({
    url: "/upload_single_base64",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data:Qs.stringify(fileData),
  });
};
