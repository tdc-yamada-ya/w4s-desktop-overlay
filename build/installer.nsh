!macro customInstall
  DetailPrint "Register W4S Desktop Overlay URI Handler"
  DeleteRegKey HKCR "W4S Desktop Overlay"
  WriteRegStr HKCR "W4S Desktop Overlay" "" "URL:w4s-desktop-overlay"
  WriteRegStr HKCR "W4S Desktop Overlay" "URL Protocol" ""
  WriteRegStr HKCR "W4S Desktop Overlay\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "W4S Desktop Overlay\shell" "" ""
  WriteRegStr HKCR "W4S Desktop Overlay\shell\Open" "" ""
  WriteRegStr HKCR "W4S Desktop Overlay\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend
