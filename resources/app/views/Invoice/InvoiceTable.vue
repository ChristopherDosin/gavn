<template>
  <div id="createInvoice">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template slot="name" slot-scope="text, record, index">
        <input v-model="dataSource[index].name" class="ant-input" type="text">
      </template>
      <template slot="description" slot-scope="text, record, index">
        <input v-model="dataSource[index].description" class="ant-input" type="text">
      </template>
      <template slot="unitCost" slot-scope="text, record, index">
        <input v-model="dataSource[index].unitCost" class="ant-input" type="text">
      </template>
      <template slot="quantity" slot-scope="text, record, index">
        <input v-model="dataSource[index].quantity" class="ant-input" type="number">
      </template>
    </a-table>
    <a-button class="editable-add-btn" @click="handleAdd">Add new item</a-button>
    <pre>
      {{dataSource}}
    </pre>
    <div style="position: relative; display: none">
      <a-icon type="plus-circle" style="position: absolute; left: -13px; top: 12px;"/>
      <a-col class="gutter-row" :span="3">
        <div class="gutter-box">
          <a-form-item>
            <a-input v-decorator="['item']"/>
          </a-form-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="12">
        <div class="gutter-box">
          <a-form-item>
            <a-input v-decorator="['description']"/>
          </a-form-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="3">
        <div class="gutter-box">
          <a-form-item>
            <a-input v-decorator="['unitCost']"/>
          </a-form-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="3">
        <div class="gutter-box">
          <a-form-item>
            <a-input v-decorator="['quantity']"/>
          </a-form-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="3">
        <span style="display:block; padding-top: 8px;">112.500,00 €</span>
      </a-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        {
          key: "0",
          name: "",
          description: "",
          unitCost: "",
          quantity: ""
        }
      ],
      count: 1,
      columns: [
        {
          title: "Item",
          dataIndex: "name",
          width: "13%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Description",
          width: "45%",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Unit Cost",
          dataIndex: "unit_cost",
          scopedSlots: { customRender: "unitCost" }
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          scopedSlots: { customRender: "quantity" }
        },
        {
          title: "Total",
          dataIndex: "total",
          width: "15%"
        }
      ]
    };
  },
  methods: {
    onCellChange(key, dataIndex) {
      return value => {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      };
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: "",
        description: "",
        unitCost: "",
        quantity: ""
      };
      //const dataSource = [...this.dataSource];
      this.dataSource.push(newData);
      this.count = count + 1;
    }
  }
};
</script>

<style scoped>
#createInvoice .ant-table-tbody > tr > td {
  padding: 0;
}
.gutter-example > .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  padding: 0 10px 0 0;
}
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin: 15px 0;
}
</style>