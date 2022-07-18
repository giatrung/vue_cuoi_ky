<template>
  <div class="container" v-if="loaded">
    <h1 class="text-center">Danh sách sản phẩm</h1>
    <!-- <div class="form-group d-flex" style="width: 30%; margin: auto">
      <input
        type="text"
        name="name"
        placeholder="Tên sản phẩm...."
        class="form-control"
      />
      <button class="btn btn-primary">Tìm</button>
    </div> -->
    <div class="row">
      <div class="col-md-6 d-flex">
        <span>Sắp xếp: </span> <select
          class="form-control"
          style="width: 50%"
          name="sort"
          id="filter"
          v-model="sortValue"
          @change="sort(sortValue)"
        >
          <option value="1">Tăng theo giá</option>
          <option value="2">Giảm theo giá</option>
          <option value="3">Số lượng tồn kho tăng dần</option>
          <option value="4">Số lượng tồn kho giảm dần</option>
        </select>
      </div>
      <div class="col-md-6">
        <button
          style="float: right"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
    <!-- Modal -->
    <div ref="addProductModals" class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Thêm sản phẩm</h4>
          </div>

          <!-- Modal body -->
          <form
            action=""
            ref="frmAddProduct"
            @submit.prevent="addProduct()"
            enctype="multipart/form-data"
          >
            <div class="modal-body">
              <div v-show="error != null">
                <p class="alert alert-success" v-if="error == ''">Sucess</p>
                <p class="alert alert-danger" v-if="error != ''">Failed</p>
              </div>
              <table class="table table-bordered product-list">
                <tr>
                  <td>Tên:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td><label for="">Hình ảnh:</label></td>
                  <td>
                    <input
                      type="text"
                      name="image[]"
                      v-model="image[0]"
                      class="form-control"
                      required
                    />
                    <!-- <input
                    type="text"
                    name="image[]"
                    v-model="image[1]"
                    class="form-control"
                  />
                  <input
                    type="text"
                    name="image[]"
                    v-model="image[2]"
                    class="form-control"
                  /> -->
                  </td>
                </tr>
                <tr>
                  <td><label for="">Giá:</label></td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td><label for="">Tồn kho:</label></td>
                  <td>
                    <input type="number" name="quantity" class="form-control" />
                  </td>
                </tr>
              </table>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table table-bordered mt-2 text-center products">
      <thead>
        <tr>
          <th>STT</th>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Tồn kho</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ index }}</td>
          <td style="width: 10%">
            <div class="text-center">
              <img
                v-for="(val, index) in item.data.image"
                :key="index"
                style="width: 100%"
                :src="val"
                alt=""
              />
            </div>
          </td>
          <td>{{ item.data.name }}</td>
          <td>${{ Number(item.data.price).toLocaleString() }}</td>
          <td>{{ item.data.quantity }}</td>
          <td style="width: fit-content">
            <button
              class="btn btn-primary"
              @click="getEditInfo(item)"
              data-toggle="modal"
              data-target="#myModal1"
            >
              Sửa
            </button>
            <button class="btn btn-danger" @click="deleteProduct(item.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div ref="editProductModals" class="modal" id="myModal1">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Thay đổi thông tin sản phẩm</h4>
          </div>

          <!-- Modal body -->
          <form
            action=""
            ref="frmEditProduct"
            @submit.prevent="editProduct()"
            enctype="multipart/form-data"
          >
            <div class="modal-body">
              <div v-show="error != null">
                <p class="alert alert-success" v-if="error == ''">Sucess</p>
                <p class="alert alert-danger" v-if="error != ''">Failed</p>
              </div>
              <table class="table table-bordered product-list">
                <tr>
                  <td>Tên:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      :value="editInfo?.data?.name"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td><label for="">Hình ảnh:</label></td>
                  <td>
                    <input
                      type="text"
                      name="image[]"
                      class="form-control"
                      v-model="image[0]"
                      required
                    />
                    <!-- <input
                    type="text"
                    name="image[]"
                    v-model="image[1]"
                    class="form-control"
                  />
                  <input
                    type="text"
                    name="image[]"
                    v-model="image[2]"
                    class="form-control"
                  /> -->
                  </td>
                </tr>
                <tr>
                  <td><label for="">Giá:</label></td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      class="form-control"
                      :value="editInfo?.data?.price"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td><label for="">Tồn kho:</label></td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      class="form-control"
                      :value="editInfo?.data?.quantity"
                    />
                  </td>
                </tr>
              </table>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                @click="resetform()"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: [],
      editInfo: null,
      loaded: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchUser");
    await this.$store.dispatch("getProducts");
    this.loaded = true;
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    addProduct() {
      this.$refs.frmAddProduct.elements["image"] = this.image;
      this.$store
        .dispatch("postProduct", this.$refs.frmAddProduct.elements)
        .then(() => {
          alert("Success");
        })
        .catch(() => {
          alert("Failed");
        });
      this.$refs.frmAddProduct.reset();
      this.image = [];
      this.$store.dispatch("getProducts");
    },
    deleteProduct(productId) {
      this.$store.dispatch("deleteProduct", productId);
      this.$store.dispatch("getProducts");
    },
    getEditInfo(productId) {
      this.editInfo = this.products[this.products.indexOf(productId)];
      this.image = this.editInfo.data.image;
    },
    editProduct() {
      this.$refs.frmEditProduct.elements["image"] = this.image;
      this.$refs.frmEditProduct.elements["productId"] = this.editInfo.id;
      console.log("edit product", this.$refs.frmEditProduct.elements);
      this.$store
        .dispatch("editProduct", this.$refs.frmEditProduct.elements)
        .then(() => {
          alert("Success");
        })
        .catch((err) => {
          alert(err);
        });
      this.$refs.frmEditProduct.reset();
      this.$store.dispatch("getProducts");
    },
    resetform() {
      this.image = [];
    },
    sort(value){
      this.$store.dispatch("sort",value);
      this.$store.dispatch("getProducts");
    }
  },
};
</script>

<style>
.product-list {
  text-align: center !important;
}
.products tr td{
  vertical-align: middle;
}
</style>
