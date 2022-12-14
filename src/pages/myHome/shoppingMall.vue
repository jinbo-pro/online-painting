<template>
  <div class="container">
    <div v-if="pageIndex != 4" class="pb-24 jsb ac">
      <PageNavigator />
      <PageNavigator type="next" @handleNext="handleNext" />
    </div>
    <el-row v-if="pageIndex == 1">
      <el-col :span="13">
        <div class="box_bod left_img jac">
          <img src="/bg.jpg" />
        </div>
        <div class="left_cover_max">
          <ScrollCoverList :list="drawingList" :current.sync="activeIndex" valueKey="cover" />
        </div>
      </el-col>
      <el-col :span="10" :offset="1">
        <div class="md_title">Select a product</div>
        <el-radio-group v-model="product">
          <div v-for="(item, index) in productList" :key="index" class="mb-16">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </div>
        </el-radio-group>
        <div class="md_title">Select a size</div>
        <el-select v-model="size">
          <el-option v-for="item in sizeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <div class="md_title">Quantity to order</div>
        <el-input-number v-model="orderCount" :min="1"></el-input-number>
        <div class="md_title">Add a card with your message</div>
        <el-input type="textarea" :rows="3" v-model="message"> </el-input>
      </el-col>
    </el-row>
    <el-row v-if="pageIndex >= 2">
      <el-col :span="12" :class="['order_message_max', { box_bod: pageIndex == 4 }]">
        <div v-if="pageIndex < 4" class="title">{{ $t(`shoppingMall['Your Order']`) }}</div>
        <div v-if="pageIndex == 4" class="title">
          <i class="el-icon-success"></i>
          <span>{{ $t(`shoppingMall['Your Order is completed']`) }}</span>
        </div>
        <div class="cover_box jac">
          <div class="mr-16">
            <img class="left_img" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" />
          </div>
          <div class="fdc jsb">
            <img class="right_img mb-14" src="http://www.ruanyifeng.com/images_pub/pub_2.jpg" />
            <img class="right_img" src="http://www.ruanyifeng.com/images_pub/pub_3.jpg" />
          </div>
        </div>
        <div>
          <p>Product: {{ product }}</p>
          <p>Size: {{ size }}</p>
          <p>Quantity: {{ orderCount }}</p>
          <p>Additional message: {{ message }}</p>
        </div>
        <div v-if="pageIndex >= 3">
          <div class="md_title">Deliver to</div>
          <p v-for="(item, index) in orderInfo" :key="index">
            {{ $t(`shoppingMall['${item.label}']`) }}: {{ item.value }}
          </p>
        </div>
        <div v-if="pageIndex == 4">
          <p>Product 15,00 EUR</p>
          <p>Delivery fee 0.00 EUR</p>
          <p>Paid with credit card xxxx</p>
        </div>
      </el-col>
      <el-col :span="11" :offset="1">
        <div v-if="pageIndex == 2">
          <div v-for="(item, index) in orderInfo" :key="index">
            <p>{{ $t(`shoppingMall['${item.label}']`) }}</p>
            <el-input v-model="item.value"> </el-input>
          </div>
        </div>
        <div v-if="pageIndex == 3" class="money_max">
          <div class="md_title">{{ $t(`shoppingMall['Payment']`) }}</div>
          <div class="fdc jac">
            <div class="money_list">
              <div class="product">Product 15,00 EUR</div>
              <div>Delivery fee 0.00 EUR</div>
            </div>
            <div class="line"></div>
          </div>
          <div class="money mb-32 jac">1500 EUR</div>
          <div class="jac">
            <el-button type="primary">{{ $t(`shoppingMall['Pay with Stripe']`) }}</el-button>
          </div>
        </div>
        <div v-if="pageIndex == 4" class="success_max fdc jac">
          <el-button class="btn_track" type="primary">{{ $t(`shoppingMall['Track my order']`) }}</el-button>
          <el-button>{{ $t(`shoppingMall['Order another one']`) }}</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="pd-30"></div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import ScrollCoverList from '@/components/ScrollCoverList.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PageNavigator,
    ScrollCoverList
  },
  data() {
    return {
      pageIndex: 1,

      activeIndex: 0,
      drawingList: [],
      product: 'Mug',
      productList: [
        { label: 'Mug', value: 'Mug' },
        { label: 'T-shirt', value: 'T-shirt' },
        { label: 'Painting', value: 'Painting' }
      ],
      size: 'S',
      sizeList: [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' },
        { label: 'XXXL', value: 'XXXL' }
      ],
      orderCount: 1,
      message: '',

      orderInfo: [
        { label: 'Name', key: 'name', value: '' },
        { label: 'Address', key: 'address', value: '' },
        { label: 'Contact number', key: 'tel', value: '' },
        { label: 'City', key: 'city', value: '' },
        { label: 'Zip code', key: 'code', value: '' },
        { label: 'Coutnry', key: 'coutnry', value: '' }
      ]
    }
  },
  created() {
    this.drawingList = listData('3-10')
  },
  methods: {
    handleNext() {
      this.pageIndex++
    }
  }
}
</script>

<style lang="scss" scoped>
.left_img {
  width: 100%;
  height: 350px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.left_cover_max {
  width: 100%;
}
.cover_box {
  .left_img {
    height: 94px;
  }
  .right_img {
    height: 40px;
  }
}
.money_max {
  .money_list {
    color: #999;
    .product {
      margin-bottom: 4px;
    }
  }
  .line {
    width: 50%;
    height: 1px;
    margin: 6px 0;
    background-color: #e1e1e1;
  }
  .money {
    font-size: 36px;
  }
}
.order_message_max {
  position: relative;
  padding-left: 56px;
  .el-icon-success {
    font-size: 32px;
    position: absolute;
    left: 16px;
    top: 22px;
    z-index: 100;
  }
}
.success_max {
  .btn_track {
    margin-top: 40vh;
    margin-bottom: 16px;
  }
}
</style>
