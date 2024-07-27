
import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let token = request.cookies.get("amh")?.value;

  if (token) {
    const response = await fetch(`https://dummyjson.com/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json()).catch(error => error);
    if (response?.id) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout', "/cart", "/success", "/canceled"],
};

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// // export const config = {
// //   matcher: "my-muisc",
// // };

// export function middleware(request) {
//   // get the URL from request header
//   const requestHeaders = new Headers(request.headers);

//   const cookieStore = cookies();
//   // const theme = cookieStore.get('theme')
//   // console.log('theme ss middle', theme)
//   console.log("requestHeaders", requestHeaders);
//   console.log("cookieStore", cookieStore);

//   requestHeaders.set("x-url", request.nextUrl.pathname);
//   // requestHeaders.set("x-url", request.nextUrl.pathname);

//   // pass the header to the layout
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }
