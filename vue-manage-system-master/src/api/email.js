import request from '../utils/request'
//发送邮件
export const sendEmail = (tos, subject, content) => {
  return request.post(`/other/sendEmail?tos=${tos}&subject=${subject}&content=${content}`);
}