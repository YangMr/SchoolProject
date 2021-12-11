/**
 * @author YangLing
 * @date 2021/12/11 1:56 PM
 */

import request from "../utils/request"

export const uploadSingle = (fileData)=>{
  return request({
    url : "/upload_single",
    method : "POST",
    headers : {
      "Content-Type" : "multipart/form-data"
    },
    data : fileData
  })
}