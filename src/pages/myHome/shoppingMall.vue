<template>
  <div>
    <div v-if="pageIndex != 4" class="pb-24 jsb ac">
      <PageNavigator />
      <PageNavigator type="next" @handleNext="handleNext" />
    </div>

    <el-row v-if="pageIndex == 1">
      <el-col :span="13">
        <div class="ac">
          <div class="left_cover_max">
            <div v-for="(item, index) in coverList" :key="index" class="left_cover_item box_show jac">
              <el-image :src="item.path"></el-image>
            </div>
          </div>
          <div class="left_img jac box_show">
            <img src="/bg.jpg" />
          </div>
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

    <el-row v-if="pageIndex < 4">
      <el-col :span="8" class="order_message_max">
        <div v-if="pageIndex < 4" class="md_title">{{ $t(`shoppingMall['Your Order']`) }}</div>
        <div class="cover_box ac">
          <div class="box_show mr-16">
            <img class="order_left_img" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" />
          </div>
          <div class="fdc jsb">
            <img class="box_show right_img mb-14" src="http://www.ruanyifeng.com/images_pub/pub_2.jpg" />
            <img class="box_show right_img" src="http://www.ruanyifeng.com/images_pub/pub_3.jpg" />
          </div>
        </div>
        <div>
          <p>Product: {{ product }}</p>
          <p>Size: {{ size }}</p>
          <p>Quantity: {{ orderCount }}</p>
          <p>Additional message: {{ message }}</p>
        </div>
        <div v-if="pageIndex == 3">
          <div class="md_title">Deliver to</div>
          <p v-for="(item, key) in orderInfo" :key="key">{{ key }}: {{ item }}</p>
        </div>
      </el-col>
      <el-col :span="15" :offset="1">
        <div v-if="pageIndex == 2" class="order_user_info">
          <div class="jsb ac">
            <div class="inline_form">
              <p>{{ $t('shoppingMall.FirstName') }}</p>
              <el-input v-model="orderInfo.firstName"> </el-input>
            </div>
            <div class="inline_form">
              <p>{{ $t('shoppingMall.LastName') }}</p>
              <el-input v-model="orderInfo.lastName"> </el-input>
            </div>
          </div>
          <div>
            <p>{{ $t('shoppingMall.Address') }}</p>
            <el-input v-model="orderInfo.address"> </el-input>
          </div>
          <div>
            <p>{{ $t('shoppingMall.Address2') }}</p>
            <el-input v-model="orderInfo.address2"> </el-input>
          </div>

          <div class="jsb ac">
            <div class="inline_form">
              <p>{{ $t('shoppingMall.City') }}</p>
              <el-input v-model="orderInfo.city"> </el-input>
            </div>
            <div class="inline_form">
              <p>{{ $t('shoppingMall.State') }}</p>
              <el-input v-model="orderInfo.state"> </el-input>
            </div>
          </div>
          <div>
            <p>{{ $t('shoppingMall.Coutnry') }}</p>
            <el-input v-model="orderInfo.coutnry"> </el-input>
          </div>
        </div>
        <div v-if="pageIndex == 3" class="money_max fdc jac">
          <div class="money_detail_box">
            <div class="money_list">
              <div class="jsb ac">
                <span>Product</span>
                <span>$20</span>
              </div>
              <div class="jsb ac">
                <span>Tax</span>
                <span>$4.6</span>
              </div>
              <div class="jsb ac">
                <span>Delivery</span>
                <span>$5.0</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="total_money jsb ac mt-16 mb-16">
              <span>Total</span>
              <span>$29.6</span>
            </div>
            <div class="foot_tips">
              *Google is going to pay for the total amount, and we would like to keep you posted on the total
              expenditure
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="pageIndex == 4" class="success_max">
      <div class="md_title ac">
        <svg-icon width="20px" height="20px" icon-class="CompleteIcon"></svg-icon>
        <span class="ml-12">{{ $t(`shoppingMall['Your Order is completed']`) }}</span>
      </div>
      <div class="cover_box ac">
        <div class="box_show mr-16">
          <img class="order_left_img" src="http://www.ruanyifeng.com/images_pub/pub_1.jpg" />
        </div>
        <div class="fdc jsb">
          <img class="box_show right_img mb-14" src="http://www.ruanyifeng.com/images_pub/pub_2.jpg" />
          <img class="box_show right_img" src="http://www.ruanyifeng.com/images_pub/pub_3.jpg" />
        </div>
      </div>
      <div>
        <p>Product: {{ product }}</p>
        <p>Size: {{ size }}</p>
        <p>Quantity: {{ orderCount }}</p>
        <p>Additional message: {{ message }}</p>
      </div>
      <div>
        <div class="xs_title">Deliver to</div>
        <p v-for="(item, key) in orderInfo" :key="key">{{ key }}: {{ item }}</p>
      </div>
      <div>
        <div class="xs_title">Payment</div>
        <div class="money_list">
          <div class="jsb ac">
            <span>Product</span>
            <span>$20</span>
          </div>
          <div class="jsb ac">
            <span>Tax</span>
            <span>$4.6</span>
          </div>
          <div class="jsb ac">
            <span>Delivery</span>
            <span>$5.0</span>
          </div>
        </div>
        <div class="total_money jsb ac">
          <span>Total</span>
          <span>$29.6</span>
        </div>
        <p>Payment made with credit card xxxx</p>
      </div>
      <div class="jac">
        <el-button class="btn_track" type="success">{{ $t(`shoppingMall['Track my order']`) }}</el-button>
      </div>
    </div>
    <div class="pd-30"></div>
  </div>
</template>

<script>
import PageNavigator from '@/components/PageNavigator.vue'
import { listData } from '@/utils/mock'
export default {
  components: {
    PageNavigator
  },
  data() {
    return {
      pageIndex: 4,

      activeIndex: 0,
      coverList: [],
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

      orderInfo: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        coutnry: ''
      }
    }
  },
  created() {
    this.coverList = listData(3)
  },
  methods: {
    handleNext() {
      this.pageIndex++
    }
  }
}
</script>

<style lang="scss" scoped>
.box_show {
  box-shadow: -4px -4px 10px rgba(0, 0, 0, 0.05);
}
.left_img {
  width: 418px;
  height: 418px;
  padding: 8px;
  box-sizing: border-box;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.left_cover_max {
  width: 150px;
  .left_cover_item {
    width: 130px;
    height: 130px;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  & .left_cover_item:last-child {
    margin-bottom: 0;
  }
}
.cover_box {
  .order_left_img {
    width: 200px;
    height: 200px;
  }
  .right_img {
    width: 90px;
    height: 90px;
  }
}
.money_detail_box {
  width: 320px;

  .line {
    width: 50%;
    height: 1px;
    margin: 6px 0;
    background-color: #e1e1e1;
  }
  .total_money {
    color: #7da453;
    font-size: 24px;
  }
  .foot_tips {
    color: #8d8d8d;
  }
}
.money_list > div {
  margin-bottom: 12px;
}

.order_message_max {
  position: relative;
  .el-icon-success {
    font-size: 32px;
    position: absolute;
    left: 16px;
    top: 22px;
    z-index: 100;
  }
}
.success_max {
  margin: 0 auto;
  width: 600px;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05), -4px -4px 10px rgba(0, 0, 0, 0.05);
  .btn_track {
    margin-top: 32px;
    padding: 10px 36px;
    border-radius: 32px;
  }
}

.order_user_info {
  .inline_form {
    width: 45%;
    display: inline-block;
  }
}
</style>
