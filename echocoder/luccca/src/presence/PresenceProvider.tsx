Last login: Thu Sep 18 11:29:47 on ttys017
cami@MacBookAir frontend % # extract directly into the module root
tar -xzf ~/Downloads/EchoDesk_Patch_03_Whiteboard_Extras.tar.gz \
  -C ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework

zsh: command not found: #
tar: Error opening archive: Failed to open '/Users/cami/Downloads/EchoDesk_Patch_03_Whiteboard_Extras.tar.gz'
cami@MacBookAir frontend % # optional helpers after extracting
chmod +x ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/apply_patch_03_from_tar.sh \
         ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/verify_patch_03.sh

# apply via helper (also ensures @import for power CSS)
bash ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/apply_patch_03_from_tar.sh

# quick sanity check
bash ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Patch_03_Whiteboard_Extras/verify_patch_03.sh

zsh: command not found: #
chmod: /Users/cami/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/apply_patch_03_from_tar.sh: No such file or directory
chmod: /Users/cami/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/verify_patch_03.sh: No such file or directory
zsh: number expected
bash: /Users/cami/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework/EchoDesk_Patch_03_Whiteboard_Extras/apply_patch_03_from_tar.sh: No such file or directory
zsh: command not found: #
bash: /Users/cami/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Patch_03_Whiteboard_Extras/verify_patch_03.sh: No such file or directory
cami@MacBookAir frontend % cd ~/Desktop/LUCCCA/frontend/src/modules/EchoDesk_Framework
npm run dev


> echo-desk-framework@0.1.0 dev
> vite

Port 8080 is in use, trying another one...
Port 8081 is in use, trying another one...
Port 8082 is in use, trying another one...

  VITE v5.4.20  ready in 239 ms

  ➜  Local:   http://localhost:8083/
  ➜  Network: http://192.168.1.122:8083/
  ➜  press h + enter to show help

