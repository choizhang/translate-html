# translate-html

## 利用谷歌翻译将静态的html文件翻译为繁体（支持任意语言翻译为任意语言，谷歌支持）。

## 说明：

1. 代码中的：http://127.0.0.1:8360/translate 是我在本地利用google-translate-api搭建的一个本地server。

2. 为什么要用google-translate-api? 因为免费

3. 对比了谷歌和百度等其他翻译工具，都是支持一次只能翻译5000个字符，由于中文的缘故，所以代码中是每2000字翻译一次再叠加

4. 对于英文字符等特殊符号的处理，谷歌更加智能。能根据整段文字的语义来决定是否翻译，而百度则不行。但是翻译出来扔来还是有一些问题，具体参考translate.js文件顶部的注释

5. demo中有一定的目录结构，可以根据具体需要来修改

