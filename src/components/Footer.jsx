import { Typography } from "@mui/material";

function Footer() {
  return (
    <div className="flex justify-center text-center bg-slate-100 h-10">
      <div className="flex flex-row gap-8 text-gray-600 p-3">
        <a href="" className="text-sm">
          Privacy Policy
        </a>
        <a href="" className="text-sm">
          Site Map
        </a>
        <Typography className="text-sm" sx={{ fontSize: 14 }}>
          ©Copyright ShopHut 2024, All rights reserved
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
