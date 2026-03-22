// --- 1. DEFAULT DATA ---

// A) DevOps Default Data
const defaultDevOpsData = [
    { id: 'm1', title: '📦 MODULE 1 — Computer Fundamentals', topics: [ 
        {id: 't1_1', title: 'Computer architecture basics (CPU, RAM, Disk)', done: false}, 
        {id: 't1_2', title: 'Storage types (HDD, SSD, NVMe)', done: false}, 
        {id: 't1_3', title: 'File systems (FAT, NTFS, ext4, xfs)', done: false}, 
        {id: 't1_4', title: 'BIOS / UEFI basics', done: false},
        {id: 't1_5', title: 'Virtualization basics (Hypervisors Type 1 & 2, Virtual machines)', done: false},
        {id: 't1_6', title: 'Tools: VirtualBox, VMware', done: false}
    ]},
    { id: 'm2', title: '🐧 MODULE 2 — Linux (Very Deep)', topics: [ 
        {id: 't2_1', title: 'Linux Basics (Distributions: Ubuntu, CentOS, RedHat)', done: false}, 
        {id: 't2_2', title: 'Linux installation & File system hierarchy', done: false}, 
        {id: 't2_3', title: 'Linux commands (ls, cd, cp, mv, rm, find, grep, awk, sed, tar, zip, chmod, chown)', done: false}, 
        {id: 't2_4', title: 'Linux Admin (User/Group management, Permissions, ACL, SUID/SGID, Sticky bit)', done: false}, 
        {id: 't2_5', title: 'Process management, System services & System logs (systemctl, journalctl)', done: false}, 
        {id: 't2_6', title: 'Linux Networking (SSH, SCP, FTP, NFS, DNS config, iptables, firewalld)', done: false},
        {id: 't2_7', title: 'Linux Storage (Disk management, Partitioning, Mounting, LVM, RAID basics)', done: false},
        {id: 't2_8', title: 'Linux Security (SELinux, AppArmor, Hardening, SSH security)', done: false}
    ]},
    { id: 'm3', title: '🌐 MODULE 3 — Networking', topics: [ 
        {id: 't3_1', title: 'Networking Basics (OSI Model, TCP/IP Model, IPv4, IPv6, Subnetting, CIDR)', done: false}, 
        {id: 't3_2', title: 'Core Networking (DNS, DHCP, NAT, ARP, ICMP)', done: false}, 
        {id: 't3_3', title: 'Protocols (HTTP, HTTPS, FTP, SMTP, SNMP, SSH)', done: false}, 
        {id: 't3_4', title: 'Network Devices (Routers, Switches, Firewalls, Load balancers)', done: false},
        {id: 't3_5', title: 'Network Security Basics (Firewalls, IDS / IPS, VPN, TLS / SSL)', done: false}
    ]},
    { id: 'm4', title: '💻 MODULE 4 — Programming & Scripting', topics: [ 
        {id: 't4_1', title: 'Python Basics (Variables, Data types, Loops, Functions, Classes, Modules)', done: false}, 
        {id: 't4_2', title: 'Python Advanced (File handling, Exception handling, JSON, YAML)', done: false}, 
        {id: 't4_3', title: 'Python Integrations (REST APIs, Requests library, Automation scripts)', done: false},
        {id: 't4_4', title: 'Bash Scripting (Variables, Loops, Conditions, Functions, Cron jobs)', done: false},
        {id: 't4_5', title: 'Optional (Recommended): Go (Golang), JavaScript basics', done: false}
    ]},
    { id: 'm5', title: '🔧 MODULE 5 — Version Control', topics: [ 
        {id: 't5_1', title: 'Git Core (git init, clone, commit, push, pull, branch, merge, rebase)', done: false}, 
        {id: 't5_2', title: 'Git Advanced (tags, stash, conflict resolution)', done: false},
        {id: 't5_3', title: 'Platforms: GitHub, GitLab, Bitbucket', done: false}
    ]},
    { id: 'm6', title: '🐳 MODULE 6 — Containers', topics: [ 
        {id: 't6_1', title: 'Docker (Deep) & Docker architecture', done: false}, 
        {id: 't6_2', title: 'Docker CLI, Dockerfile, Docker images, Docker containers', done: false}, 
        {id: 't6_3', title: 'Docker Volumes & Networks', done: false},
        {id: 't6_4', title: 'Docker Compose', done: false},
        {id: 't6_5', title: 'Multi-stage builds, Image optimization, Registry usage', done: false}
    ]},
    { id: 'm7', title: '☸️ MODULE 7 — Container Orchestration', topics: [ 
        {id: 't7_1', title: 'Kubernetes (Deep) & Architecture', done: false}, 
        {id: 't7_2', title: 'Workloads (Pods, ReplicaSets, Deployments, StatefulSets, DaemonSets)', done: false}, 
        {id: 't7_3', title: 'Networking & Routing (Services, Ingress)', done: false},
        {id: 't7_4', title: 'Config & Security (ConfigMaps, Secrets, Namespaces, RBAC, Network policies)', done: false},
        {id: 't7_5', title: 'Management (Resource quotas, Autoscaling, Helm, Operators)', done: false}
    ]},
    { id: 'm8', title: '🔁 MODULE 8 — CI/CD Pipelines', topics: [ 
        {id: 't8_1', title: 'Tools (Jenkins, GitHub Actions, GitLab CI)', done: false}, 
        {id: 't8_2', title: 'Pipeline design & Automation workflows', done: false},
        {id: 't8_3', title: 'Build automation & Testing automation', done: false},
        {id: 't8_4', title: 'Deployment automation & Artifact management', done: false},
        {id: 't8_5', title: 'Pipeline security & Pipeline optimization', done: false}
    ]},
    { id: 'm9', title: '🏗️ MODULE 9 — Infrastructure as Code', topics: [ 
        {id: 't9_1', title: 'Terraform Concepts (Providers, Resources, Variables, Modules)', done: false}, 
        {id: 't9_2', title: 'Terraform State & Environments (Remote state, Workspaces)', done: false},
        {id: 't9_3', title: 'Configuration Management Tools: Ansible', done: false},
        {id: 't9_4', title: 'Ansible Topics (Inventory, Playbooks, Roles, Templates, Automation workflows)', done: false}
    ]},
    { id: 'm10', title: '📊 MODULE 10 — Monitoring & Logging', topics: [ 
        {id: 't10_1', title: 'Monitoring Tools: Prometheus, Grafana', done: false}, 
        {id: 't10_2', title: 'Logging Tools: ELK Stack (Elasticsearch, Logstash, Kibana)', done: false},
        {id: 't10_3', title: 'Topics: Metrics, Logs, Alerts, Dashboards', done: false}
    ]},
    { id: 'm11', title: '☁️ MODULE 11 — Cloud Fundamentals', topics: [ 
        {id: 't11_1', title: 'Choose Platform: AWS (recommended), Azure, or GCP', done: false}, 
        {id: 't11_2', title: 'Compute: Virtual machines, Auto scaling', done: false},
        {id: 't11_3', title: 'Storage: Object storage, Block storage, File storage', done: false},
        {id: 't11_4', title: 'Networking: VPC, Subnets, Routing', done: false},
        {id: 't11_5', title: 'Identity (IAM), Load balancing, DNS', done: false}
    ]},
    { id: 'm12', title: '🔐 MODULE 12 — Security Fundamentals', topics: [ 
        {id: 't12_1', title: 'Core Topics: CIA triad, Authentication, Authorization', done: false}, 
        {id: 't12_2', title: 'Cryptography: Encryption, Hashing, PKI, TLS', done: false},
        {id: 't12_3', title: 'Management: Secrets management, Vulnerability basics', done: false}
    ]},
    { id: 'm13', title: '🔧 ADVANCED DEVOPS SYLLABUS', topics: [ 
        {id: 't13_1', title: 'Advanced CI/CD (Blue/Green, Canary, Rolling updates, Feature flags)', done: false}, 
        {id: 't13_2', title: 'Advanced Kubernetes (Helm charts, Kubernetes operators)', done: false},
        {id: 't13_3', title: 'Service mesh (Tools: Istio, Linkerd)', done: false},
        {id: 't13_4', title: 'Release Management (Versioning strategies, Nexus, Artifactory)', done: false},
        {id: 't13_5', title: 'Performance Engineering (Load testing, Capacity planning, JMeter)', done: false}
    ]},
    { id: 'm14', title: '☁️ CLOUD DEVOPS SYLLABUS', topics: [ 
        {id: 't14_1', title: 'Cloud Platform Deep Dive (AWS Example)', done: false}, 
        {id: 't14_2', title: 'Compute Services (EC2, Lambda, ECS, EKS)', done: false},
        {id: 't14_3', title: 'Storage Services (S3, EBS, EFS)', done: false},
        {id: 't14_4', title: 'Networking (VPC, NAT Gateway, Route tables, Security groups)', done: false},
        {id: 't14_5', title: 'Databases (RDS, DynamoDB)', done: false},
        {id: 't14_6', title: 'Serverless (Lambda, API Gateway, Event-driven architecture)', done: false},
        {id: 't14_7', title: 'Cloud Cost Optimization (Billing monitoring, Resource optimization)', done: false}
    ]},
    { id: 'm15', title: '🔐 DEVSECOPS SYLLABUS', topics: [ 
        {id: 't15_1', title: 'Application Security (SAST, DAST, SCA)', done: false}, 
        {id: 't15_2', title: 'AppSec Tools (SonarQube, Snyk)', done: false},
        {id: 't15_3', title: 'Container Security Topics (Image scanning, Runtime security)', done: false},
        {id: 't15_4', title: 'Container Security Tools (Trivy, Clair)', done: false},
        {id: 't15_5', title: 'Secrets Management (Tools: HashiCorp Vault)', done: false},
        {id: 't15_6', title: 'Compliance Automation (Standards: CIS benchmarks, OWASP Top 10)', done: false}
    ]},
    { id: 'm16', title: '🛡️ CLOUD SECURITY SYLLABUS', topics: [ 
        {id: 't16_1', title: 'Cloud Security Architecture (Shared responsibility model, Threat models)', done: false}, 
        {id: 't16_2', title: 'Identity Security (IAM roles, MFA, Identity federation)', done: false},
        {id: 't16_3', title: 'Data Security (Encryption at rest, Encryption in transit, Tools: KMS)', done: false},
        {id: 't16_4', title: 'Threat Detection (Tools: GuardDuty, Security Hub)', done: false},
        {id: 't16_5', title: 'Compliance Standards (ISO 27001, SOC 2, PCI-DSS)', done: false}
    ]}
];

// B) DSA Default Data
const defaultDSAData = [
    { id: 'dsa_m0', title: '🟢 Phase 0 — C++ Fundamentals', topics: [
        {id: 'dsa_t0_1', title: 'Input/Output (cin, cout, fast I/O)', done: false},
        {id: 'dsa_t0_2', title: 'Data Types & Operators', done: false},
        {id: 'dsa_t0_3', title: 'Conditional Statements (if, else, switch) & Loops', done: false},
        {id: 'dsa_t0_4', title: 'Functions, Arrays, Strings (std::string)', done: false},
        {id: 'dsa_t0_5', title: 'Pointers & Recursion Basics', done: false},
        {id: 'dsa_t0_6', title: 'C++ STL (vector, map, set, priority_queue, pair, sort)', done: false}
    ]},
    { id: 'dsa_m1', title: '🟡 Phase 1 — Time & Space Complexity', topics: [
        {id: 'dsa_t1_1', title: 'Big O notation & Time complexity analysis', done: false},
        {id: 'dsa_t1_2', title: 'Space complexity & Best/Worst/Avg case', done: false},
        {id: 'dsa_t1_3', title: 'Common complexities (O(1), O(log n), O(n), O(n log n), O(n²))', done: false},
        {id: 'dsa_t1_4', title: 'Practice: Analyze nested loops, Recursion, Binary search', done: false}
    ]},
    { id: 'dsa_m2', title: '🔵 Phase 2 — Arrays & Strings (Core)', topics: [
        {id: 'dsa_t2_1', title: 'Array Traversal, Searching, Sorting basics', done: false},
        {id: 'dsa_t2_2', title: 'Prefix Sum & Sliding Window', done: false},
        {id: 'dsa_t2_3', title: 'Two Pointer technique & Kadane’s Algorithm', done: false},
        {id: 'dsa_t2_4', title: 'String traversal, Palindrome, Anagram, Pattern matching', done: false},
        {id: 'dsa_t2_5', title: 'Must Practice: Two Sum, Maximum Subarray, Move Zeroes', done: false}
    ]},
    { id: 'dsa_m3', title: '🟣 Phase 3 — Recursion & Backtracking', topics: [
        {id: 'dsa_t3_1', title: 'Base case, Recursive tree, Tail recursion, Stack space', done: false},
        {id: 'dsa_t3_2', title: 'Backtracking: Subsets, Permutations, Combination Sum', done: false},
        {id: 'dsa_t3_3', title: 'Backtracking: N-Queens, Sudoku Solver', done: false}
    ]},
    { id: 'dsa_m4', title: '🟠 Phase 4 — Sorting & Searching', topics: [
        {id: 'dsa_t4_1', title: 'Sorting (Bubble, Selection, Insertion, Merge, Quick)', done: false},
        {id: 'dsa_t4_2', title: 'Stable vs unstable, In-place sorting', done: false},
        {id: 'dsa_t4_3', title: 'Linear Search & Binary Search', done: false},
        {id: 'dsa_t4_4', title: 'Binary Search on Answer, Lower/Upper Bound', done: false}
    ]},
    { id: 'dsa_m5', title: '🔴 Phase 5 — Linked List', topics: [
        {id: 'dsa_t5_1', title: 'Singly, Doubly, and Circular Linked List', done: false},
        {id: 'dsa_t5_2', title: 'Operations: Insert, Delete, Reverse, Find Middle', done: false},
        {id: 'dsa_t5_3', title: 'Must Practice: Reverse, Detect Cycle (Floyd’s), Merge Lists', done: false}
    ]},
    { id: 'dsa_m6', title: '🟤 Phase 6 — Stack & Queue', topics: [
        {id: 'dsa_t6_1', title: 'Stack Implementation, Monotonic Stack', done: false},
        {id: 'dsa_t6_2', title: 'Next Greater Element, Expression Evaluation', done: false},
        {id: 'dsa_t6_3', title: 'Queue, Circular Queue, Deque', done: false}
    ]},
    { id: 'dsa_m7', title: '🌳 Phase 7 — Trees', topics: [
        {id: 'dsa_t7_1', title: 'Traversals: Inorder, Preorder, Postorder, Level Order', done: false},
        {id: 'dsa_t7_2', title: 'Tree Properties: Height, Diameter, Balanced', done: false},
        {id: 'dsa_t7_3', title: 'Binary Search Tree (BST): Insert, Delete, Search, Validate', done: false}
    ]},
    { id: 'dsa_m8', title: '🌲 Phase 8 — Heap / Priority Queue', topics: [
        {id: 'dsa_t8_1', title: 'Min Heap, Max Heap, Heapify, Heap Sort', done: false},
        {id: 'dsa_t8_2', title: 'Must Practice: K Largest Elements, Merge K Sorted Arrays', done: false}
    ]},
    { id: 'dsa_m9', title: '🕸️ Phase 9 — Hashing', topics: [
        {id: 'dsa_t9_1', title: 'Hash tables & Collision handling', done: false},
        {id: 'dsa_t9_2', title: 'Frequency counting', done: false},
        {id: 'dsa_t9_3', title: 'Practice: Two Sum, Subarray with given sum, Longest sequence', done: false}
    ]},
    { id: 'dsa_m10', title: '🌐 Phase 10 — Graphs', topics: [
        {id: 'dsa_t10_1', title: 'Representation: Adjacency Matrix, Adjacency List', done: false},
        {id: 'dsa_t10_2', title: 'Traversal: BFS, DFS', done: false},
        {id: 'dsa_t10_3', title: 'Advanced: Topological Sort, Dijkstra Algorithm', done: false},
        {id: 'dsa_t10_4', title: 'Advanced: Bellman-Ford, Floyd-Warshall', done: false},
        {id: 'dsa_t10_5', title: 'Minimum Spanning Tree: Kruskal, Prim', done: false}
    ]},
    { id: 'dsa_m11', title: '🧠 Phase 11 — Dynamic Programming', topics: [
        {id: 'dsa_t11_1', title: 'Basic: Fibonacci, Climbing Stairs, Coin Change', done: false},
        {id: 'dsa_t11_2', title: 'Intermediate: Knapsack, LCS, Matrix Chain Multiplication', done: false},
        {id: 'dsa_t11_3', title: 'Advanced: DP on Trees, DP on Strings, Bitmask DP', done: false}
    ]},
    { id: 'dsa_m12', title: '⚙️ Phase 12 — Greedy Algorithms', topics: [
        {id: 'dsa_t12_1', title: 'Activity Selection & Job Scheduling', done: false},
        {id: 'dsa_t12_2', title: 'Huffman Coding & Fractional Knapsack', done: false}
    ]},
    { id: 'dsa_m13', title: '🧩 Phase 13 — Advanced Topics', topics: [
        {id: 'dsa_t13_1', title: 'Tries & Disjoint Set (Union-Find)', done: false},
        {id: 'dsa_t13_2', title: 'Segment Tree & Fenwick Tree (BIT)', done: false},
        {id: 'dsa_t13_3', title: 'Suffix Arrays, KMP Algorithm, Rabin-Karp', done: false}
    ]}
];

// C) Timetable / Daily Routine Default Data
const defaultTimetableData = [
    { id: 'tt_m1', title: 'MONDAY – FRIDAY', category: 'weekdays', topics: [
        {id: 'tt_t1_1', title: '06:30 AM  •  🌅 Wake up + freshen up', done: false},
        {id: 'tt_t1_2', title: '06:40 AM  •  🧠 Easy DSA (1 easy question)', done: false},
        {id: 'tt_t1_3', title: '07:00 AM  •  🗣️ English Speaking', done: false},
        {id: 'tt_t1_4', title: '07:20 AM  •  🍳 Breakfast', done: false},
        {id: 'tt_t1_5', title: '07:30 AM  •  🚌 Travel to college', done: false},
        {id: 'tt_t1_6', title: '08:00 AM  •  🎒 College Time', done: false},
        {id: 'tt_t1_7', title: '03:30 PM  •  🌇 Rest & Snack', done: false},
        {id: 'tt_t1_8', title: '03:45 PM  •  ⭐ DSA Deep Practice', done: false},
        {id: 'tt_t1_9', title: '05:45 PM  •  ☕ Break', done: false},
        {id: 'tt_t1_10', title: '06:00 PM  •  ⚙️ DevOps Learning', done: false},
        {id: 'tt_t1_11', title: '08:00 PM  •  🍽️ Dinner', done: false},
        {id: 'tt_t1_12', title: '08:30 PM  •  📚 College Studies', done: false},
        {id: 'tt_t1_13', title: '09:30 PM  •  ☕ Break', done: false},
        {id: 'tt_t1_14', title: '09:45 PM  •  🚀 Extra Practice', done: false},
        {id: 'tt_t1_15', title: '10:45 PM  •  🌙 Night Revision', done: false},
        {id: 'tt_t1_16', title: '11:30 PM  •  💤 Sleep', done: false}
    ]},
    { id: 'tt_m2', title: 'SATURDAY', category: 'weekends', topics: [
        {id: 'tt_t2_1', title: '06:30 AM  •  🌅 Wake up', done: false},
        {id: 'tt_t2_2', title: '06:40 AM  •  🧠 Easy DSA', done: false},
        {id: 'tt_t2_3', title: '07:10 AM  •  ☕ Break', done: false},
        {id: 'tt_t2_4', title: '07:25 AM  •  ⭐ Deep DSA Practice', done: false},
        {id: 'tt_t2_5', title: '09:25 AM  •  ☕ Break', done: false},
        {id: 'tt_t2_6', title: '09:40 AM  •  ⚙️ DevOps Session', done: false},
        {id: 'tt_t2_7', title: '12:00 PM  •  🍽️ Lunch', done: false},
        {id: 'tt_t2_8', title: '12:30 PM  •  🚀 DevOps Hands-on', done: false},
        {id: 'tt_t2_9', title: '02:30 PM  •  ☕ Break', done: false},
        {id: 'tt_t2_10', title: '02:45 PM  •  🧠 DSA Session 2', done: false},
        {id: 'tt_t2_11', title: '04:15 PM  •  ☕ Break', done: false},
        {id: 'tt_t2_12', title: '04:30 PM  •  ⚙️ DevOps Project', done: false},
        {id: 'tt_t2_13', title: '06:00 PM  •  ☕ Break', done: false},
        {id: 'tt_t2_14', title: '06:15 PM  •  🗣️ English Practice', done: false},
        {id: 'tt_t2_15', title: '08:00 PM  •  🍽️ Dinner', done: false},
        {id: 'tt_t2_16', title: '08:30 PM  •  🌙 Night Revision', done: false},
        {id: 'tt_t2_17', title: '09:30 PM  •  🚀 Light Practice', done: false},
        {id: 'tt_t2_18', title: '11:30 PM  •  💤 Sleep', done: false}
    ]},
    { id: 'tt_m3', title: 'SUNDAY', category: 'weekends', topics: [
        {id: 'tt_t3_1', title: '06:30 AM  •  🌅 Wake up', done: false},
        {id: 'tt_t3_2', title: '06:40 AM  •  🧠 Easy DSA', done: false},
        {id: 'tt_t3_3', title: '07:10 AM  •  ☕ Break', done: false},
        {id: 'tt_t3_4', title: '07:25 AM  •  ⭐ Weekly DSA Revision', done: false},
        {id: 'tt_t3_5', title: '09:25 AM  •  ☕ Break', done: false},
        {id: 'tt_t3_6', title: '09:40 AM  •  ⚙️ DevOps Practice', done: false},
        {id: 'tt_t3_7', title: '12:00 PM  •  🍽️ Lunch', done: false},
        {id: 'tt_t3_8', title: '12:30 PM  •  🚀 Project Building', done: false},
        {id: 'tt_t3_9', title: '03:00 PM  •  ☕ Break', done: false},
        {id: 'tt_t3_10', title: '03:15 PM  •  🧠 DSA Mock', done: false},
        {id: 'tt_t3_11', title: '04:45 PM  •  ☕ Break', done: false},
        {id: 'tt_t3_12', title: '05:00 PM  •  🗣️ English Practice', done: false},
        {id: 'tt_t3_13', title: '08:00 PM  •  🍽️ Dinner', done: false},
        {id: 'tt_t3_14', title: '08:30 PM  •  📝 Weekly Planning', done: false}
    ]},
    { id: 'tt_m4', title: 'TARGETS', category: 'targets', topics: [
        {id: 'tt_t4_1', title: '✅ 1 Easy DSA daily morning', done: false},
        {id: 'tt_t4_2', title: '✅ 3–5 DSA problems daily', done: false},
        {id: 'tt_t4_3', title: '✅ Hands-on DevOps practice', done: false},
        {id: 'tt_t4_4', title: '✅ English speaking habit', done: false},
        {id: 'tt_t4_5', title: '📊 DSA goal: ~20–25 hrs/week', done: false},
        {id: 'tt_t4_6', title: '📊 DevOps goal: ~22–26 hrs/week', done: false}
    ]}
];
