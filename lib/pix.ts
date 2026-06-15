import { QrCodePix } from "qrcode-pix";

type PixParams = {
  key: string;
  name: string;
  city: string;
  amount?: number;
  description: string;
  txid: string;
};

export function generatePixPayload({
  key,
  name,
  city,
  amount,
  description,
  txid,
}: PixParams) {
  const qrCodePix = QrCodePix({
    version: "01",
    key,
    name,
    city,
    transactionId: txid,
    message: description,
    value: amount,
  });

  return qrCodePix.payload();
}