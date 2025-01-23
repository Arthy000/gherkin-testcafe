Following combinations of versions of Gherkin-TestCafe and TestCafe have been tested and are compatible.


| GTC version | TC versions (peer dependencies) | TC versions (not peer dependencies) |
| - | - | - |
| 7.4.0 | ^3.7.0 | / |
| 7.3.0 | ^3.6.0 | / |
| 7.2.0 | 2.0.0 - 3.5.0 | / |
| 7.1.2 | 2.0.0 - 3.2.0 | / |
| 7.1.1 | ^2.0.0 <= 3.2.0 | / |
| 7.1.0 | ^2.0.0 <= 3.1.0 | / |
| 7.0.0 | ^2.0.0 <= 2.5.0 | / |
| 6.0.1 | ^2.0.0 <= 2.5.0 | / |
| 6.0.0 | ~1.20.0 &#124;&#124; ^2.0.0 <= 2.3.1 | / |
| 5.6.0 | ~1.20.0 &#124;&#124; ^2.0.0 <= 2.2.0 | / |
| 5.5.2 | ~1.20.0 &#124;&#124; ^2.0.0 <= 2.1.0 | 2.2.0 |
| 5.5.1 | ~1.20.0 | ^2.0.0 <= 2.1.0 |
| 5.5.0 | ~1.20.0 | / |
| 5.4.4 | ~1.20.0 | / |
| 5.4.3 | ~1.18.0 &#124;&#124; 1.19.0 | / |

`TC versions (not peer dependencies) ` are compatible with the corresponding GTC version. 
However, they were not included in the peer dependencies of the package at the time of release, 
thus they will trigger a warning during the installation process.
