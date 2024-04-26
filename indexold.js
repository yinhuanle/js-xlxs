const XLSX = require('xlsx');

// Your multi-level JavaScript object
const data = {
  notifyTemp: {
    seted: '已设置',
    tips: {
      warning: '请插入正确的参数'
    }
  },
  smsNoticeAccount: {
    fcm: {
      clientEmail: '客户端邮箱',
      clientId: '客户端ID',
      clientX509CertUrl: '客户端X509证书地址',
      privateKey: '私钥',
      privateKeyId: '私钥ID',
      projectId: '项目ID',
      type: '类型'

    }
  },

  /** V2.17.2增量字段end */
  /** V2.19.0增量字段start */
  workOrderSet: {
    SidebarTree: {
      placeholder: '搜索类型',
      add: '新建一级问题类型',
      type: {
        1: '户外',
        2: '租赁'
      },
      solution: '所属解决方案'
    },
    error: '异常',
    noData: '暂无',
    roleType: {
      3: '按角色',
      1: '按分组',
      2: '按人员',
    },
    roleTypeOptions: {
      3: '角色：',
      1: '分组：',
      2: '人员：',
    },
    roleTypeValid: {
      0: '请选择工单管理员',
      1: '请选择角色',
      2: '请选择分组',
      3: '请选择人员',
    },
    orderConfType: {
      1: '自动派单',
      2: '手动派单',
    },

    steps: {
      title: '工单节点配置',
      create: {
        title: '创建工单',
        createUsers: '建单人员',
        rule: {
          1: '仅员工',
          2: '员工及用户'
        },
        webRule: {
          1: '全部员工',
          2: '部分员工',
        },
        channels: '建单渠道',
        channelsOptions: {
          WEB: 'Web管理后台',
          APP: 'B端App',
        }
      },
      handle: {
        title: '处理工单',
        node: '节点',
        nodeName: '节点名称',
        handler: '处理人',
        transfer: '能否转办',
        transferr: '转办人',
        transferred: {
          1: '能',
          0: '否',
        },
      },
      dispatch: {
        title: '派发工单',
      },

      handleDialog: {
        add: '新增节点流程设置',
        edit: '编辑节点流程设置',
      },
      completeName: {
        title: '完成工单',
        sendValue: '节点完成推送',
        sendTo: '推送给建单人',
      },

    },

    submit: {
      save: '您的节点信息尚未输入完整，暂时无法保存！',
      stop: '停用后对应的渠道无法创建该工单类型，是否停用？'
    }
  },

  orderDetail: {
    operator: '操作人',
    completeTime: '操作时间'
  },

  systemV219: {
    businessType: '业务类型',
    dataReport: '请选择数据报表',

  },
  payAlipay: {
    zhiMaId: '芝麻id',
    alipayPrivateKey: '支付宝私钥',
    sceneCode: '免密代扣场景码',
    subSceneCode: '免密代扣场景码子码',
    alipayPublicCertPath: '支付宝公钥证书',
    appCertPath: '应用证书',
    rootCertPath: '根证书',
  },
  xlsx: {
    deploy: '设备投放明细',
    deployBatch: '批量投放设备模板',
    dispatch: '设备分配明细',
    dispatchBatch: '批量分配设备模板'
  }
};

// Create a new workbook
const wb = XLSX.utils.book_new();

// Add each object as a separate worksheet
Object.entries(data).forEach(([sheetName, sheetData]) => {


  // Convert nested objects into arrays of objects
  const flatData = flattenObject(sheetData, sheetName);
  const ws = XLSX.utils.json_to_sheet([flatData]);
  console.log('ws', ws);
  // ws['!cols'] = [{ wch: 30 }, { wch: 30 }]; // Adjust column width if needed
  let arr = []
  let length = Object.keys(sheetData).length < 200 ? 200 : Object.keys(sheetData).length
  for (let colIndex = 0; colIndex < length; colIndex++) {
    arr.push({ wch: 30 })
  }
  ws['!cols'] = arr
  
  

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
});

// Write the workbook to a file
XLSX.writeFile(wb, '翻译old.xlsx');

console.log('File created successfully!');

// Function to flatten nested objects
function flattenObject(obj, sheetName, parentKey = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = parentKey ? `${parentKey}.${key}` : `${key}`;
    if (typeof obj[key] === 'object') {
      return { ...acc, ...flattenObject(obj[key], sheetName, prefixedKey) };
    } else {
      return { ...acc, [prefixedKey]: obj[key] };
    }
  }, {});
}