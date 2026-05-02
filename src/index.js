"use strict";

import { initDOM } from "./ui/dom";
import { loadProjects, ensureDemoProject } from "./app/app_layer";

loadProjects();
ensureDemoProject();
initDOM();
