#!/bin/bash

###############################################################################
# File: install_script.sh
#
# Description: This script automates the installation of services and applications
#              on a Unix-based system. It includes functions to create folders,
#              copy files, and execute service installations.
#
# Usage:
#   ./install_script.sh
#
# Author: Klas Hagelqvist
#
# Date: November 10, 2023
#
# Version: 1.0
#
# Dependencies: This script requires bash and access to system utilities.
#
# Note: Customize the 'services' and 'apps' arrays with the desired service
#       and application names before running the script.
#
###############################################################################



copy_to_folder() {
    if [ ! -d "$2" ]; then
        mkdir -p "$2"
    fi
    cp "$1" "$2"
}

# Function to create a folder if it does not exist
# Usage: create_folder_if_not_exists <folder_path>
create_folder_if_not_exists() {
    folder_path="$1"

    if [ ! -d "$folder_path" ]; then
        mkdir -p "$folder_path"
        echo "Created folder: $folder_path"
    fi
}


copy_folder() {
    # Source folder
    source_folder="$1"
    # Destination folder
    destination_folder="$2"

    mkdir -p "$destination_folder"

    # Copy the entire folder to the destination folder
    cp -r "$source_folder" "$destination_folder"
    echo "Copied folder: $source_folder"
}

# Function to execute service installation
# Usage: execute_install_service <CUR_APP> <export_path>
execute_install_service() {
  local CUR_APP="$1"
  local export_path="$2"

  # Copy binary to /usr/local/bin
  cp "$export_path/apps/$CUR_APP/$CUR_APP" "/usr/local/bin" || { echo "Error: Failed to copy binary to /usr/local/bin"; exit 1; }

  # Create folder and copy config file to /etc
  create_folder_if_not_exists "/etc/$CUR_APP"
  cp "$export_path/apps/$CUR_APP/resources/etc/$CUR_APP/$CUR_APP.conf" "/etc/$CUR_APP" || { echo -e "\033[31mError: Failed to copy config file to /etc/$CUR_APP\033[0m"; exit 1; }


  # Copy systemd service file to /etc/systemd/system
  cp "$export_path/apps/$CUR_APP/resources/system/$CUR_APP.service" "/etc/systemd/system" || { echo "Error: Failed to copy systemd service file to /etc/systemd/system"; exit 1; }

  # Create symbolic link
  ln -sf "/etc/systemd/system/$CUR_APP.service" "/etc/systemd/system/multi-user.target.wants/" || { echo "Error: Failed to create symbolic link"; exit 1; }

  
 
  echo -e "\033[32mInstallation for service $CUR_APP completed successfully.\033[0m"

}


execute_install_app() {
  local CUR_APP="$1"
  local export_path="$2"

  # Copy binary to /usr/local/bin
  cp "$export_path/apps/$CUR_APP/$CUR_APP" "/usr/local/bin" || { echo "Error: Failed to copy binary to /usr/local/bin"; exit 1; }
    
  echo -e "\033[32mInstallation for app $CUR_APP completed successfully.\033[0m"

}


# Remove existing export folder
rm -rf export

# Extract files from the archive
tar -xzvf archive.tar.gz  > /dev/null 2>&1

exit 0

# Create /usr/local/bin if it does not exist
create_folder_if_not_exists "/usr/local/bin"


#services=("ep4init" "ep4db" "ep4modbusserver" "ep4webserver" "ep4candsp" "ep4digitalinputs" "ep4hicp")

services=(
  "ep4init|init"
  "ep4db|database"
  "ep4modbusserver|modbusserver"
  "ep4webserver|webserver"
  "ep4candsp|candsp"
  "ep4digitalinputs|digitalinputs"
  "ep4hicp|hicp"
  "ep4iogroups|iogroups"
  "ep4limiters|limiters"
  "ep4master|master"
  "ep4monitor|monitor"
  "ep4rappingscheduler|rappingscheduler"
  "ep4timers|timers"
  "ep4virtualinputs|virtualinputs"
  "ep4volatilelogger|volatilelogger"
)

#apps=("ep4dbg" "ep4dspethprog")
apps=(
  "ep4dbg|dbg"
  "ep4dspethprog|dspethprog"
  "ep4getsetting|getsetting"
  "ep4loadsave|loadsave"
  "ep4measurement|measurement"
  "ep4scopecapture|scopecapture"
  "ep4dcrb|dcrb"
  "ep4loadsave|loadsave"
)


#Install applications
for app in "${apps[@]}"; do
    # Execute installation for the current appp
	IFS='|' read -r cur_app app_name <<< "$app"
    execute_install_app "$cur_app" "./export"

    
done

#Install services
for service in "${services[@]}"; do
  IFS='|' read -r cur_service service_name <<< "$service"
    # Execute installation for the current service
	systemctl stop "$cur_service"
    execute_install_service "$cur_service" "./export"
	#systemctl start "$cur_service"
    
done


#Special folders
copy_folder "./export/apps/ep4webserver/resources/www" "/srv" > /dev/null 2>&1
copy_folder "./export/apps/ep4init/resources/var/lib/epic4" "/var/lib" > /dev/null 2>&1
tar -xvf "./export/apps/ep4init/resources/var/lib/epic4/zoneinfo.tar.gz" -C "/usr/share/" > /dev/null 2>&1

#pure-ftp
copy_to_folder "./apps/pure-ftp/pure-ftpd" "/usr/sbin"
copy_to_folder "./apps/pure-ftp/pure-pw" "/usr/sbin"
copy_to_folder "./apps/pure-ftp/resources/etc/pure-ftpd.conf" "/etc/pure-ftpd"
copy_to_folder "./apps/pure-ftp/resources/system/pure-ftpd.service" "/etc/systemd/system"

#Chronyd
copy_to_folder "./apps/pure-ftpd/pure-ftpd" "/usr/sbin"
copy_to_folder "./apps/pure-ftp/resources/etc/pure-ftpd.conf" "/etc/pure-ftpd"
copy_to_folder "./apps/pure-ftp/resources/system/pure-ftpd.service" "/etc/systemd/system"

systemctl daemon-reload > /dev/null 2>&1

# Restart services
for service in "${services[@]}"; do
  IFS='|' read -r cur_service service_name <<< "$service"

	systemctl start "$cur_service" 
 	echo -e "\033[32mStarting service $cur_service.\033[0m"
done


