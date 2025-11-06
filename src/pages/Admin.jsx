import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { api } from "../../services/api";
import { getImageById } from "/Styles/product-images";

// ---------- Small UI helpers ----------
function Section({ title, children, right }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
function Field({ label, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-lg border border-gray-300 px-3 h-10 bg-white focus:outline-none focus:ring-2 focus:ring-black/10 " +
        (props.className || "")
      }
    />
  );
}
function NumberInput(props) {
  return <Input type="number" inputMode="numeric" {...props} />;
}
function PrimaryButton({ children, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={
        "inline-flex items-center justify-center rounded-lg bg-black text-white h-10 px-4 hover:bg-gray-800 transition " +
        className
      }
    >
      {children}
    </button>
  );
}
function GhostButton({ children, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={
        "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 h-10 px-4 hover:bg-gray-100 transition " +
        className
      }
    >
      {children}
    </button>
  );
}

export default function Admin() {
  const navigate = useNavigate();

  // ---------- topbar state ----------
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUserName(decoded.UserName);
    } catch {
      return;
    }
  }, []);

  // ---------- sidebar nav ----------
  const TABS = [
    { key: 0, label: "Products" },
    { key: 1, label: "Categories" },
    { key: 2, label: "Roles" },
    { key: 3, label: "Dashboard" },
    { key: 4, label: "Addresses" },
    { key: 5, label: "Log out" },
  ];
  const [active, setActive] = useState(0);

  // ---------- drawers ----------
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ---------- cart ----------
  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

  async function refreshCart() {
    const { data } = await api.get("/OrderItem/Current", { headers: auth() });
    setCart({
      orderId: data?.orderId ?? 0,
      items: data?.items ?? [],
      actualPrice: data?.actualPrice ?? 0,
    });
  }
  useEffect(() => {
    if (cartOpen) refreshCart();
  }, [cartOpen]);

  async function removeItem(rowId) {
    await api.delete("/OrderItem/DropItem", { params: { OrderItemsId: rowId }, headers: auth() });
    refreshCart();
  }
  async function incQty(rowId, qty) {
    await api.put(
      "/OrderItem/EditQuantity",
      { quantity: qty + 1 },
      { params: { OrderItemsId: rowId }, headers: { "Content-Type": "application/json", ...auth() } }
    );
    refreshCart();
  }
  async function decQty(rowId, qty) {
    if (qty <= 1) return;
    await api.put(
      "/OrderItem/EditQuantity",
      { quantity: qty - 1 },
      { params: { OrderItemsId: rowId }, headers: { "Content-Type": "application/json", ...auth() } }
    );
    refreshCart();
  }

  // ---------- tab bodies ----------
  function Body() {
    switch (active) {
      case 0:
        return <ProductsTab />;
      case 1:
        return <CategoriesTab />;
      case 2:
        return <RolesTab />;
      case 3:
        return (
          navigate("/pages/AdminDashboard")
        );
      case 4:
        return <AddressesTab />;
      case 5:
        localStorage.removeItem("token");
        navigate("/login");
        return null;
      default:
        return null;
    }
  }

  // ---------- layout ----------
  return (
    <main className="min-h-screen bg-[#f5f6f8]">
      <Navbar
        onMenuClick={() => setMenuOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Console</h1>
            <p className="text-sm text-gray-500">ยินดีต้อนรับ, <span className="font-medium">{userName || "User"}</span></p>
          </div>
          <div className="flex gap-3">
            <GhostButton onClick={() => navigate("/pages/Home")}>ไปหน้าร้าน</GhostButton>
            <PrimaryButton onClick={() => setCartOpen(true)}>เปิดตะกร้า</PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`w-full text-left px-4 h-11 rounded-lg transition ${
                    active === t.key
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-12 md:col-span-9">
            <Body />
          </section>
        </div>
      </div>

      {/* -------- Menu Drawer (mobile) -------- */}
      {menuOpen && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-black/40"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">เมนู</h3>
              <button onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black">
                <IoClose size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <GhostButton onClick={() => navigate("/pages/Home")}>Home</GhostButton>
              <GhostButton onClick={() => navigate("/pages/Speakers")}>Speakers</GhostButton>
              <GhostButton onClick={() => navigate("/pages/Headphones")}>Headphones</GhostButton>
              <GhostButton onClick={() => navigate("/pages/Soundbars")}>Soundbars</GhostButton>
              <GhostButton onClick={() => setMenuOpen(false)}>ปิด</GhostButton>
            </div>
          </div>
        </div>
      )}

      {/* -------- Cart Drawer -------- */}
      {cartOpen && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setCartOpen(false)}
          className="fixed inset-0 z-[60] bg-black/40"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-[380px] bg-white shadow-2xl flex flex-col"
          >
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold">ตะกร้าสินค้า</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-black">
                <IoClose size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.items.length === 0 ? (
                <p className="text-gray-500 text-center py-10">ตะกร้ายังว่าง</p>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.orderItemsId}
                    className="border border-gray-200 rounded-xl p-3 flex gap-3"
                  >
                    <div className="w-24 h-20 rounded-lg bg-gray-50 overflow-hidden grid place-items-center">
                      <img
                        src={getImageById(item.productId)}
                        alt={item.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold truncate">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.orderItemsId)}
                          className="text-gray-500 hover:text-black"
                        >
                          <IoClose size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.productDescription}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <GhostButton onClick={() => decQty(item.orderItemsId, item.qty)}>−</GhostButton>
                        <span className="w-8 text-center">{item.qty}</span>
                        <GhostButton onClick={() => incQty(item.orderItemsId, item.qty)}>+</GhostButton>
                        <span className="ml-auto font-semibold">
                          ฿{Number(item.subtotal).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">ยอดรวม</span>
                <span className="text-xl font-bold">
                  ฿{Number(cart.actualPrice || 0).toLocaleString()}
                </span>
              </div>
              <PrimaryButton className="w-full" onClick={() => navigate("/pages/Address")}>
                ชำระเงิน
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ====================== TAB: PRODUCTS ====================== */
function ProductsTab() {
  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  // Add
  const [form, setForm] = useState({
    ProductId: "",
    CategoryId: "",
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
  });
  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/Product/AddProduct",
        {
          ProductId: form.ProductId,
          CategoryId: form.CategoryId,
          ProductName: form.ProductName,
          ProductDescription: form.ProductDescription,
          ProductPrice: form.ProductPrice,
          IsActive: true,
          ProductId2: form.ProductId, // (คงตามของเดิม)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("เพิ่มสำเร็จ");
      console.log(res.data);
      setForm({
        ProductId: "",
        CategoryId: "",
        ProductName: "",
        ProductDescription: "",
        ProductPrice: "",
      });
    } catch (err) {
      if (err?.response && typeof err.response.data === "string") alert("มีอยู่แล้ว");
      else alert("ยังไม่ได้ใส่ข้อมูล");
    }
  };

  // Delete
  const [dropId, setDropId] = useState("");
  const onDelete = async () => {
    if (!dropId) return alert("กรอก ProductId ก่อน");
    try {
      await api.delete("/Product/DropProduct", {
        headers: auth(),
        params: { ProductId: Number(dropId) },
      });
      alert("ลบสำเร็จ");
      setDropId("");
    } catch (err) {
      alert(err?.response ? "ลบไม่สำเร็จ" : "error");
    }
  };

  // Edit
  const [edit, setEdit] = useState({
    ProductId: "",
    CategoryId: "",
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
  });
  const onEditChange = (e) => setEdit((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onEdit = async () => {
    if (!edit.ProductId) return alert("ไม่มี ProductId");
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/Product/EditProduct",
        {
          ProductId: Number(edit.ProductId),
          CategoryId: Number(edit.CategoryId),
          ProductName: edit.ProductName,
          ProductDescription: edit.ProductDescription,
          ProductPrice: parseFloat(edit.ProductPrice || "0"),
        },
        { headers: { Authorization: `Bearer ${token}` }, params: { ProductId: Number(edit.ProductId) } }
      );
      alert("แก้ไขสำเร็จ");
    } catch (err) {
      if (err.response?.status === 404) alert("ไม่พบสินค้า");
      else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="grid gap-6">
      {/* Add & Delete in two columns */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Add Product">
          <form className="grid gap-4" onSubmit={onAdd}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product Id">
                <NumberInput name="ProductId" value={form.ProductId} onChange={onChange} />
              </Field>
              <Field label="Category Id">
                <NumberInput name="CategoryId" value={form.CategoryId} onChange={onChange} />
              </Field>
            </div>
            <Field label="Product Name">
              <Input name="ProductName" value={form.ProductName} onChange={onChange} />
            </Field>
            <Field label="Product Description">
              <Input name="ProductDescription" value={form.ProductDescription} onChange={onChange} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product Price">
                <NumberInput name="ProductPrice" value={form.ProductPrice} onChange={onChange} />
              </Field>
            </div>
            <div className="flex gap-3">
              <PrimaryButton type="submit">Save</PrimaryButton>
              <GhostButton type="reset" onClick={() => setForm({
                ProductId: "",
                CategoryId: "",
                ProductName: "",
                ProductDescription: "",
                ProductPrice: "",
              })}>
                Clear
              </GhostButton>
            </div>
          </form>
        </Section>

        <Section title="Delete Product">
          <div className="grid gap-4">
            <Field label="Product Id">
              <NumberInput value={dropId} onChange={(e) => setDropId(e.target.value)} />
            </Field>
            <div className="flex gap-3">
              <PrimaryButton onClick={onDelete}>Delete</PrimaryButton>
              <GhostButton onClick={() => setDropId("")}>Clear</GhostButton>
            </div>
          </div>
        </Section>
      </div>

      <Section title="Edit Product">
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Product Id">
              <NumberInput name="ProductId" value={edit.ProductId} onChange={onEditChange} />
            </Field>
            <Field label="Category Id">
              <NumberInput name="CategoryId" value={edit.CategoryId} onChange={onEditChange} />
            </Field>
          </div>
          <Field label="Product Name">
            <Input name="ProductName" value={edit.ProductName} onChange={onEditChange} />
          </Field>
          <Field label="Product Description">
            <Input name="ProductDescription" value={edit.ProductDescription} onChange={onEditChange} />
          </Field>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Product Price">
              <NumberInput name="ProductPrice" value={edit.ProductPrice} onChange={onEditChange} />
            </Field>
          </div>
          <div className="flex gap-3">
            <PrimaryButton onClick={onEdit}>Save changes</PrimaryButton>
            <GhostButton onClick={() => setEdit({
              ProductId: "",
              CategoryId: "",
              ProductName: "",
              ProductDescription: "",
              ProductPrice: "",
            })}>
              Clear
            </GhostButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================== TAB: CATEGORIES ====================== */
function CategoriesTab() {
  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  // Add
  const [form, setForm] = useState({ CategoryId: "", CategoryName: "", CategoryDescription: "" });
  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/Category/AddCategory",
        {
          CategoryId: form.CategoryId,
          CategoryName: form.CategoryName,
          CategoryDescription: form.CategoryDescription,
          IsActive: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("เพิ่มสำเร็จ");
      console.log(res.data);
      setForm({ CategoryId: "", CategoryName: "", CategoryDescription: "" });
    } catch (err) {
      if (err.response && typeof err.response.data === "string") alert("มีอยู่แล้ว");
      else alert("ยังไม่ใส่ข้อมูล");
    }
  };

  // Delete
  const [dropId, setDropId] = useState("");
  const onDelete = async () => {
    if (!dropId) return alert("กรอก CategoryId ก่อน");
    try {
      await api.delete("/Category/DropCategory", {
        headers: auth(),
        params: { CategoryId: Number(dropId) },
      });
      alert("ลบสำเร็จ");
      setDropId("");
    } catch (err) {
      alert(err?.response ? "ลบไม่สำเร็จ" : "error");
    }
  };

  // Edit
  const [edit, setEdit] = useState({
    CategoryId: "",
    CategoryName: "",
    CategoryDescription: "",
  });
  const onEditChange = (e) => setEdit((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onEdit = async () => {
    if (!edit.CategoryId) return alert("ไม่มี CategoryId");
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/Category/EditCategory",
        {
          CategoryName: edit.CategoryName,
          CategoryDescription: edit.CategoryDescription,
        },
        { headers: { Authorization: `Bearer ${token}` }, params: { CategoryId: Number(edit.CategoryId) } }
      );
      alert("แก้ไขสำเร็จ");
    } catch (err) {
      if (err.response?.status === 404) alert("ไม่พบหมวดหมู่");
      else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Add Category">
          <form className="grid gap-4" onSubmit={onAdd}>
            <Field label="Category Id">
              <NumberInput name="CategoryId" value={form.CategoryId} onChange={onChange} />
            </Field>
            <Field label="Category Name">
              <Input name="CategoryName" value={form.CategoryName} onChange={onChange} />
            </Field>
            <Field label="Category Description">
              <Input name="CategoryDescription" value={form.CategoryDescription} onChange={onChange} />
            </Field>
            <div className="flex gap-3">
              <PrimaryButton type="submit">Save</PrimaryButton>
              <GhostButton type="reset" onClick={() => setForm({ CategoryId: "", CategoryName: "", CategoryDescription: "" })}>
                Clear
              </GhostButton>
            </div>
          </form>
        </Section>

        <Section title="Delete Category">
          <div className="grid gap-4">
            <Field label="Category Id">
              <NumberInput value={dropId} onChange={(e) => setDropId(e.target.value)} />
            </Field>
            <div className="flex gap-3">
              <PrimaryButton onClick={onDelete}>Delete</PrimaryButton>
              <GhostButton onClick={() => setDropId("")}>Clear</GhostButton>
            </div>
          </div>
        </Section>
      </div>

      <Section title="Edit Category">
        <div className="grid gap-4">
          <Field label="Category Id">
            <NumberInput name="CategoryId" value={edit.CategoryId} onChange={onEditChange} />
          </Field>
          <Field label="Category Name">
            <Input name="CategoryName" value={edit.CategoryName} onChange={onEditChange} />
          </Field>
          <Field label="Category Description">
            <Input name="CategoryDescription" value={edit.CategoryDescription} onChange={onEditChange} />
          </Field>
          <div className="flex gap-3">
            <PrimaryButton onClick={onEdit}>Save changes</PrimaryButton>
            <GhostButton onClick={() => setEdit({ CategoryId: "", CategoryName: "", CategoryDescription: "" })}>
              Clear
            </GhostButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================== TAB: ROLES ====================== */
function RolesTab() {
  const [edit, setEdit] = useState({ UserId: "", Roles: "0" }); // 0 Admin, 1 Member
  const onChange = (e) => setEdit((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSave = async () => {
    if (!edit.UserId) return alert("ไม่มี UserId");
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/Authen/EditRole",
        { Roles: edit.Roles },
        { headers: { Authorization: `Bearer ${token}` }, params: { UsersId: Number(edit.UserId) } }
      );
      alert("แก้ไขสำเร็จ");
    } catch (err) {
      if (err.response?.status === 404) alert("ไม่พบผู้ใช้");
      else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="grid gap-6">
      <Section title="Edit Role">
        <div className="grid gap-4 max-w-lg">
          <Field label="User Id">
            <NumberInput name="UserId" value={edit.UserId} onChange={onChange} />
          </Field>
          <Field label="Roles">
            <select
              name="Roles"
              value={edit.Roles}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 px-3 h-10 bg-white"
            >
              <option value="0">Admin</option>
              <option value="1">Member</option>
            </select>
          </Field>
          <div className="flex gap-3">
            <PrimaryButton onClick={onSave}>Save</PrimaryButton>
            <GhostButton onClick={() => setEdit({ UserId: "", Roles: "1" })}>Clear</GhostButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================== TAB: ADDRESSES ====================== */
function AddressesTab() {
  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  const [address, setAddress] = useState({ addressId: [], items: [] });

  async function refreshAddress() {
    const { data } = await api.get("/Address/UiAddress2", { headers: auth() });
    setAddress({
      addressId: data?.addressId ?? [],
      items: data?.items ?? [],
    });
  }
  useEffect(() => {
    refreshAddress();
  }, []);

  async function removeAddress(rowId) {
    await api.delete("/Address/DelAddress", {
      params: { AddressId: rowId },
      headers: auth(),
    });
    refreshAddress();
  }

  return (
    <div className="grid gap-6">
      <Section title="My Address">
        {address.items?.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีที่อยู่</p>
        ) : (
          <div className="grid gap-3">
            {address.items.map((item) => (
              <div key={item.addressId} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
                <button
                  onClick={() => removeAddress(item.addressId)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-black"
                >
                  <IoClose size={18} />
                </button>
                <h3 className="font-semibold">
                  {item.name}, {item.district}, {item.province} {item.postalCode}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Phone: {item.phoneNumber}</p>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}