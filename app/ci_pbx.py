# 雲端上架打包用：只把 App 這個 target 的 Release 設定改成用上架憑證和描述檔（手動簽名）
import re
p='App.xcodeproj/project.pbxproj';s=open(p).read()
m=re.search(r'/\* Release \*/ = \{\s*isa = XCBuildConfiguration;\s*buildSettings = \{([^}]*?PRODUCT_BUNDLE_IDENTIFIER = tw\.starlight\.adventure;)',s)
assert m,'Release config not found'
body=m.group(1).replace('CODE_SIGN_STYLE = Automatic;','CODE_SIGN_STYLE = Manual;\n\t\t\t\tCODE_SIGN_IDENTITY = "Apple Distribution";\n\t\t\t\t"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "Apple Distribution";\n\t\t\t\tPROVISIONING_PROFILE_SPECIFIER = "Starlight AppStore CI";')
assert body!=m.group(1)
s=s[:m.start(1)]+body+s[m.end(1):];open(p,'w').write(s);print('pbxproj signing set')
