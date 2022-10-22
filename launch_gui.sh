#!/bin/bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT

#starting ros core service
# echo starting roscore
# roscore &
# echo wait untill roscore starts
# sleep 2.5s

# starting gui api node
echo starting launcher api ros
rosrun ninjabot_launcher_api launcher_api.py &
echo wait untill api starts
sleep 2.5s

# starting gui api node
echo starting ros webtf node
rosrun tf2_web_republisher tf2_web_republisher &
echo wait untill ros webtf node starts
sleep 2.5s

# starting gui api node
echo starting rosbridge node
roslaunch rosbridge_server  rosbridge_websocket.launch &
echo wait untill rosbridge node starts
sleep 3s

# starting joystick teleop control node
echo starting joystick teleop node
roslaunch ninjabot_teleop joy_control.launch  &
echo wait untill joystick teleop node starts
sleep 3s

# starting GUI
echo starting GUI
npm run electron:serve &
wait

#wair for ctrlC & kill all procsses
