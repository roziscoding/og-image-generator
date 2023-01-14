import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.172.0/path/mod.ts";
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import React, { createElement as h } from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.5/mod.ts";
import { encode as toBase64 } from "https://deno.land/std@0.172.0/encoding/base64.ts";

const __dirname = fromFileUrl(dirname(import.meta.url));

const image = await Deno.readFile(join(__dirname, "bg_full.png"));
const b64Image = `data:image/png;base64,${toBase64(image)}`;

const font = await Deno.readFile(join(__dirname, "font.woff"));

function handler(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const title = params.get("title");
  const fontSize = Number(params.get("fontSize") ?? "150");

  return new ImageResponse(
    <body
      style={{
        margin: 0,
      }}
    >
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100vw",
          height: "100vh",
        }}
        src={b64Image}
      />
      <div
        style={{
          width: "1440px",
          height: "732px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "150px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize,
            fontFamily: "Bryant",
          }}
        >
          {title}
        </h1>
      </div>
    </body>,
    {
      width: 1440,
      height: 732,
      fonts: [{
        data: font,
        name: "Bryant",
      }],
    },
  );
}

serve(handler);
