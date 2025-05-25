export const roleAccessConfig = {
    "Admin Role for Bucket Creation": {
      canViewHome: true,
      sidebarKeys: ['master', 'allotment', 'recoveryReport', 'actionTaken', 'customerCare', 'report']
    },
    "Agency User": {
      canViewHome: true,
      sidebarKeys: ['allotment','recoveryReport', 'actionTaken', 'customerCare', 'report']
    },
    "Circle Head": {
      canViewHome: true,
      sidebarKeys: ['allotment']
    },
    "Call Center Executive": {
      canViewHome: false,
      sidebarKeys: ['customerCare']
    },
    "Call Center Admin": {
      canViewHome: false,
      sidebarKeys: ['customerCare']
    },
    "Normal User": {
      canViewHome: false,
      sidebarKeys: []
    },
    "Recovery Officer": {
      canViewHome: true,
      sidebarKeys: ['recoveryReport']
    },
    "Commercial Officer": {
      canViewHome: true,
      sidebarKeys: ['recoveryReport']
    },
    "Call Center IVRS": {
      canViewHome: false,
      sidebarKeys: ['customerCare']
    }
  };