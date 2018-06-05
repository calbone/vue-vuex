<template>
  <div id="spamWrap">
    <main class="spamListWrap">
      <table class="spamList">
        <thead>
          <tr>
            <th>ID</th>
            <th>追加日</th>
            <th>ブロック条件</th>
            <th>登録者</th>
            <th>
              <el-button @click="inputAdditionSpamRule" :disabled="isAdditionMode">+新しく追加</el-button>
            </th>
          </tr>
        </thead>
        <tbody v-show="isAdditionMode" :class="{addBlockRule:isAdditionMode}">
          <tr>
            <td></td>
            <td></td>
            <td colspan="2">
              <ul v-if="additionInputMode" class="spamRuleInputList">
                <li>
                  <el-input placeholder="ブロックしたい件名" v-model.trim="restrictName"/>
                </li>
                <li>
                  <el-input placeholder="ブロックしたいメールアドレス" v-model.trim="restrictAddress"/>
                </li>
              </ul>
              <div v-if="additionConfirmMode && (restrictName || restrictAddress)">
                <div class="textBr">
                  {{restrictName && '件名（' + restrictName + '）'}}
                  {{restrictAddress && 'from:（' + restrictAddress + '）'}}
                </div>
              </div>
            </td>
            <td>
              <div v-if="additionInputMode" class="actionWrap">
                <a href="#"
                   @click.prevent="cancelAdditionSpamRule"
                   class="actionText">キャンセル</a>

                <el-button class="actionButton addButton"
                           @click="confirmAdditionSpamRule"
                           :disabled="!restrictName && !restrictAddress">追加確認</el-button>
              </div>
              <div v-if="additionConfirmMode" class="actionWrap">
                <a href="#"
                   @click.prevent="returnToInputMode"
                   class="actionText">編集に戻る</a>
                <el-tooltip class="actionButton"
                            placement="top"
                            effect="light"
                            content="今後、該当のメールは自動的に削除されます">
                  <el-button @click="addSpamBlock" class="addButton" :disabled="inValid">追加</el-button>
                </el-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="spamList.length > 0" :class="{ inActive: isAdditionMode }">
          <tr v-for="(spam, index) in currentPageSpamList"
              :key="spam.id">
            <td>{{spam.id}}</td>
            <td>{{spam.created_at}}</td>
            <td class="textBr">
              {{spam.subject && '件名(' + spam.subject + ')'}}
              {{spam.from && 'from:(' + spam.from + ')'}}
            </td>
            <td>{{spam.created_by}}</td>
            <td>
              <div v-if="spam.id == removeSpamRuleId && removeConfirmMode" class="actionWrap">
                <a href="#" @click.prevent="cancelRemovalSpecifyRule" class="actionText">キャンセル</a>
                <el-tooltip class="actionButton"
                            placement="top"
                            effect="light"
                            content="今後、このブロック条件のメールが届くようになります">
                  <el-button type="danger" @click="removeSpecifySpamRule(index)">解除</el-button>
                </el-tooltip>
              </div>
              <div v-else class="actionWrap">
                <a href="#"
                   @click.prevent="() => confirmRemovalSpecifyRule(spam.id)"
                   class="actionText">解除確認</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isPagination" class="pagination">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="totalNum"></el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import firebase from 'firebase';
import { Input, Button, Tooltip, Pagination } from 'element-ui';

Vue.use(Input);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Pagination);

export default {
  name: 'spam',
  props: {
    spamList: Array,
    insertedSpamIdList: Array,
    newSpamRule: Object,
    currentPage: Number,
    pageSize: Number,
    totalNum: Number,
    removeSpamRuleId: Number,
    additionInputMode: Boolean,
    additionConfirmMode: Boolean,
    removeConfirmMode: Boolean,
    removeCompletedMode: Boolean,
    inValid: Boolean
  },
  computed: {
    ...mapGetters([
      'pageTransfer'
    ]),
    restrictName: {
      get(){return this.newSpamRule.subject},
      set(val){this.inputRestrictName(val)}
    },
    restrictAddress: {
      get(){return this.newSpamRule.from},
      set(val){this.inputRestrictAddress(val)}
    },
    isAdditionMode(){return this.additionInputMode || this.additionConfirmMode},
    currentPageSpamList(){return (this.spamList.length > this.pageSize) ? this.spamList.slice(0, this.spamList.length - 1) : this.spamList},
    isPagination(){return this.totalNum > this.pageSize}
  },
  methods: {
    test() {
      const db = firebase.database();
      const messageRef = db.ref('/message');
      messageRef.set({
        nogizaka: {
          member: this.input
        }
      });
    },
    ...mapActions([
      'removeSpecifySpamRule',
      'fetchSpamList',
      'addSpamBlock',
    ]),
    ...mapMutations([
      'inputRestrictName',
      'inputRestrictAddress',
      'inputAdditionSpamRule',
      'confirmAdditionSpamRule',
      'cancelAdditionSpamRule',
      'returnToInputMode',
      'confirmRemovalSpecifyRule',
      'cancelRemovalSpecifyRule',
      'handleCurrentChange',
    ]),
  },
  watch: {
    // currentPageの値が変更されたら発火する
    // pageTransfer(currentPage) {
    //   this.fetchSpamList();
    // }
  },
}
</script>

<style lang="scss" scoped>
.spamListWrap {
  padding: 15px 30px;
}
.spamList {
  width: 100%;
  text-align: left;
  .addBlockRule {
    background: #ffffdb;
  }
  thead {
    color: #fff;
    background-color: #919191;
    th {
      padding: 10px 20px;
    }
  }
  tbody {
    vertical-align: middle;
    tr {
      border-bottom: 1px solid #d6d6d6;
      td {
        padding: 10px 20px;
      }
    }
  }
  th,
  td {
    vertical-align: middle;
    &:nth-child(3) {
      width: 50%;
    }
  }
}
.newItem {
  background-color: #ffffe8;
}
.actionWrap {
  display: flex;
  align-items: center;
}
.actionText {
  & + .actionButton {
    margin-left: 10px;
  }
}
.spamRuleInputList {
  width: 80%;
  > li + li {
    margin-top: 3px;
  }
}
.addButton {
  color: #fff;
  background: #666;
}
button:disabled {
  opacity: .3;
  &:hover {
    color: #fff;
    background: #666;
  }
}
.inActive {
  opacity: .4;
  pointer-events: none;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.textBr {
  word-break: break-all;
}
</style>
