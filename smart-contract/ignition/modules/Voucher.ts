import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";


const VoucherModule = buildModule("VoucherModule", (m) => {


  const voucher = m.contract("Voucher");

  return { voucher };
});

export default VoucherModule;
