defmodule ProblyLive.SpeedChannel do
  use ProblyLive.Web, :channel
  alias ProblyLive.Presence

  def join("speed", _, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info("after_join", socket) do
    Presence.track(socket, socket.assigns.user_id, %{})
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_in("speed_set", %{"speed" => speed}, socket) do
    Presence.update(socket, socket.assigns.user_id, %{
      speed: speed
    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end
