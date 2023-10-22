import React from "react";
import { Footer } from "antd/es/layout/layout";

export default function CustomFooter() {
    return (
    <Footer
              className="row-span-1 flex items-center justify-center font-bold md:text-xl text-base "
              style={{ textAlign: 'center' }}
            >
              Interviewify © 2023
            </Footer>
    )
}