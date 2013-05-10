require 'rubygems'
require 'em-websocket'
require 'sinatra/base'
require 'haml'
require 'amqp'
require 'json'

$channel = EM::Channel.new

EM.run do
  class App < Sinatra::Base

    get '/' do
      haml :index
    end

  end

  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |ws|
    ws.onopen {
      AMQP.start(:host => "slant.ops.directi.com") do |connection|
        $channel = AMQP::Channel.new(connection)
        exchange = $channel.fanout("slant", :auto_delete => false, :durable => true)
        queue    = $channel.queue("slant-events", :auto_delete => false, :durable => true)

        queue.bind(exchange, :routing_key => "").subscribe(:ack => true) do |headers, payload|
          ws.send payload.to_s
          puts payload
          $channel.acknowledge(headers.delivery_tag, false)
        end
      end
    }
  end
  App.run!({:port => 3000})
end
