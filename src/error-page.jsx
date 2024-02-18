import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.error(error)

  return (
    <div id="error-page">
          <h1 className="text-center my-6">Oops!</h1>
          <img src="https://admin.esports.gg/wp-content/uploads/2023/09/Yogg-Saron-Hearthstone-Titan-Fall-of-Ulduar-Miniset.jpg" alt="error-page not found" className="block mx-auto w-5/6"/>
          <p className="text-center my-4">Something went wrongggg</p>
          <p className="text-center my-2">
              <i>Page {error.statusText || error.message}</i>
          </p>
    </div>
  );
}