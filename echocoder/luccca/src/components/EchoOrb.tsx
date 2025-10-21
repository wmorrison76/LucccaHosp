zsh: command not found: #
zsh: no matches found: EchoBuilderShell_batch_*
cami@MacBookAir echo % ~/Desktop/echo-ai-clean/src/echo

zsh: permission denied: /Users/cami/Desktop/echo-ai-clean/src/echo
cami@MacBookAir echo % for batch in EchoBuilderShell_batch_*; do
  if [ -d "$batch" ]; then
    cp -R "$batch"/* .
  fi
done

zsh: no matches found: EchoBuilderShell_batch_*
cami@MacBookAir echo % 
