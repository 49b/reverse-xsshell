import asyncio
import websockets
import os
import sys

def clearConsole():
    if os.name == 'nt':
        _ = os.system('cls')
    else:
        _ = os.system('clear')

async def hello(websocket, path):
    print("WebSocket received")

    while True:
        try:
            cmd = input("> ")
            if cmd == ".clear":
                clearConsole()
            elif cmd == ".exit":
                sys.exit(0)
            else:
                await websocket.send(cmd)
                #
                out = await websocket.recv()
                print(out)
        except KeyboardInterrupt:
            print("\n(to exit, type .exit)")

start_server = websockets.serve(hello, "127.0.0.1", 8085)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
