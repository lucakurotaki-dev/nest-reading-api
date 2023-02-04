export interface ISendRecoveryPasswordEmailDTO {
  to: string;
  token: string | number;
}

export interface IEmailService {
  sendRecoveryPasswordEmail(data: ISendRecoveryPasswordEmailDTO);
}
