import axios from 'axios';
import { Message } from 'element-ui';

// 新規のブロック条件の初期化
const initNewBlockRule = {
  newSpamRule: {
    subject: null,
    from: null,
  }
};
// 削除対象条件の初期化
const initRemoveBlockRule = {
  removeSpamRuleId: null
};
// 各編集モードの初期化
const initMode = {
  additionInputMode: false,
  additionConfirmMode: false,
  removeConfirmMode: false,
  removeCompletedMode: false
};

// ページャの初期化
const initPagination = {
  currentPage: 1,
  pageSize: 15,
  totalNum: 0,
};

// バリデーションチェックの初期化
const validCheck = {
  inValid: false,
}

const state = {
  mutation: {
    spamList: [],
    insertedSpamIdList: [],
    ...initNewBlockRule,
    ...initRemoveBlockRule,
    ...initMode,
    ...initPagination,
    ...validCheck,
  }
};

const getters = {
  pageTransfer: state => () => state.mutation.currentPage
};

const mutations = {
  // スパムリストを構成する
  setSpamList: (state, { data }) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      spamList: [
        ...data
      ]
    };
  },
  // スパムリスト総計を構成する
  setTotalNum: (state, { data }) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      totalNum: data
    };
  },
  // 制限する件名を入力する
  inputRestrictName: (state, name) => {
    const {
      mutation,
      mutation: { newSpamRule }
    } = state;
    state.mutation = {
      ...mutation,
      newSpamRule: {
        ...newSpamRule,
        subject: name
      }
    };
  },
  // 制限するメールアドレスを入力する
  inputRestrictAddress: (state, address) => {
    const {
      mutation,
      mutation: { newSpamRule }
    } = state;
    state.mutation = {
      ...mutation,
      newSpamRule: {
        ...newSpamRule,
        from: address
      }
    };
  },
  // ブロック条件を新しく追加する
  inputAdditionSpamRule: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      additionInputMode: true
    };
  },
  // 入力したブロック条件を確認する
  confirmAdditionSpamRule: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      additionConfirmMode: true,
      inValid: false,
    };
  },
  // 入力したブロック条件をキャンセルする
  cancelAdditionSpamRule: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initNewBlockRule,
      ...initMode
    };
  },
  // 追加ボタンをdisableにする
  disableAdd: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      inValid: true,
    };
  },
  // 入力したブロック条件を追加する
  insertAdditionSpamRule: (state, {data}) => {
    const {
      mutation,
      mutation: {
        spamList,
        insertedSpamIdList
      }
    } = state;
    state.mutation = {
      ...mutation,
      ...initNewBlockRule,
      ...initMode,
      additionConfirmMode: false,
      spamList: [
        data,
        ...spamList
      ],
      insertedSpamIdList: [
        data.id,
        ...insertedSpamIdList
      ],
      inValid: true,
      totalNum: mutation.totalNum + 1,
      currentPage: 1
    };
  },
  // 編集モードに戻る
  returnToInputMode: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      additionInputMode: true
    };
  },
  // 指定した条件を解除確認する
  confirmRemovalSpecifyRule: (state, id) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      removeConfirmMode: true,
      removeSpamRuleId: id
    };
  },
  // 指定した条件を解除する
  removeSpecifyRule: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      removeConfirmMode: false,
      totalNum: mutation.totalNum - 1,
      spamList: [
        ...mutation.spamList
      ],
    };
  },
  // 条件を解除をキャンセルする
  cancelRemovalSpecifyRule: (state) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      ...initMode,
      ...initRemoveBlockRule
    };
  },
  // ページャーでページを選択
  handleCurrentChange: (state, page) => {
    const { mutation } = state;
    state.mutation = {
      ...mutation,
      currentPage: page
    };
  },
};

const actions = {
  // 初期のブロック条件リストを取得
  fetchSpamList: async ({ commit, state: { mutation } }) => {
    try {
      const response = await axios.get(`http://localhost:3000/spam?_page=${mutation.currentPage}&_limit=${initPagination.pageSize}`)
        // 追加日の表示を/yyyy/mm/ddに変換
        for(let i = 0; i < response.data.rows.length; i++) {
          let convertAddDay = response.data.rows[i].created_at.split(/ /g, 1).join("").replace(/-/g, "/");
          Object.assign(response.data.rows[i], {created_at:convertAddDay});
        }
        commit('setSpamList', {data: response.data.rows});
        commit('setTotalNum', {data: response.data.total_rows});
    }
    catch(e) {
      Message({
        message: `ブロック条件が取得できませんでした ${error}`,
        type: 'error',
        duration: 3000
      })
      throw error;
    }
  },
  // 新規ブロック条件の投稿
  submitNewSpamRule: ({ commit, state: { mutation } }) => axios.post('http://localhost:3000/spam', {...mutation.newSpamRule})
  .then(response => {
    let convertAddDay = response.data.created_at.split(/ /g, 1).join("").replace(/-/g, "/");
    Object.assign(response.data, {created_at:convertAddDay});
    commit('insertAdditionSpamRule', {data:response.data});
    Message({
      message: `新しいブロック条件を追加しました`,
      type: 'success',
      duration: 3000
    });
  })
  .catch(error => {
    Message({
      message: `新しいブロック条件を追加できませんでした ${error}`,
      type: 'error',
      duration: 3000
    });
    throw error;
  }),
  // 追加ボタンをdisableにしてから新規ブロック条件を送信
  addSpamBlock: ({commit, dispatch}) => {
    return new Promise(resolve => {
      resolve(commit('disableAdd'));
    })
    .then(() => dispatch('submitNewSpamRule'))
    .catch(error => {
      Message({
        message: `ブロック条件の送信ができませんでした。 ${error}`,
        type: 'error',
        duration: 3000
      });
    });
  },
  // 指定したブロック条件を削除
  removeSpecifySpamRule: ({ commit, state: { mutation } }, idx) =>
   axios.delete(`/admin/api/spam/${mutation.removeSpamRuleId}`, {...mutation.removeSpamRuleId})
  .then(() => {
    mutation.spamList.splice(idx, 1);
    commit('removeSpecifyRule');
    Message({
      message: `指定したブロック条件を削除しました`,
      type: 'success',
      duration: 3000
    });
    window.location.reload();
  })
  .catch(error => {
    Message({
      message: `ブロック条件を削除できませんでした ${error}`,
      type: 'error',
      duration: 3000
    });
  }),
};

export default {
  state,
  getters,
  mutations,
  actions
};
