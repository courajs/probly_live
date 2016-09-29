defmodule ProblyLive.Router do
  use ProblyLive.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :anonymous_ids
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ProblyLive do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", ProblyLive do
  #   pipe_through :api
  # end

  defp anonymous_ids(conn, _options) do
    {id, conn} = 
      case get_session(conn, :uuid) do
        nil ->
          uuid = UUID.uuid1()
          {uuid, put_session(conn, :uuid, uuid)}
        _ -> {get_session(conn, :uuid), conn}
      end
    assign(conn, :user_id, id)
  end
end
