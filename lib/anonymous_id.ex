defmodule AnonymousID do
  import Plug.Conn

  def init(default), do: default

  def call(conn, _opts) do
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
