import React from "react";
import { Router } from "@reach/router";
import AdminClientes from "./admin/AdminClientes";
import AdminPaquetes from "./admin/AdminPaquetes";
import AdminPaqueteForm from "./admin/AdminPaqueteForm";
import AdminClases from "./admin/AdminClases";
import AdminSesiones from "./admin/AdminSesiones";
import AdminAsistentes from "./admin/AdminAsistentes";
import AdminLocations from "./admin/AdminLocations";
import AdminCoaches from "./admin/AdminCoaches";
import AdminSingleUsuario from "./admin/AdminSingleUsuario";
import AdminCategories from "./admin/AdminCategories";
import AdminSingleCategory from "./admin/AdminSingleCategory";
import AdminHome from "./admin/AdminHome";
import AdminClassTypes from "./admin/AdminClassTypes";
import AdminDescuentos from "./admin/AdminDescuentos";
import AdminEspeciales from "./admin/AdminEspeciales";
import AdminAsistentesEspeciales from "./admin/AdminAsistentesEspeciales";
import AdminCustomerForm from "./admin/AdminCustomerForm";
import AdminOrdenes from "./admin/AdminOrdenes";
import AdminUsuarios from "./admin/AdminUsuarios";
import AdminCircuitos from "./admin/AdminCircuitos";

const Admin = () => {
  return (
    <Router>
      <AdminClientes path="/clientes" />
      <AdminCustomerForm path="/customer/:customer_id/edit" />
      <AdminSingleUsuario path="/customer/:customer_id" />
      <AdminPaquetes path="/paquetes" />
      <AdminPaqueteForm path="/paquetes/:package_class_id" />
      <AdminClases path="/clases/*" default />
      <AdminSesiones path="/asistentes" />
      <AdminAsistentes path="/asistentes/:single_class_id" />
      <AdminLocations path="/ubicaciones" />
      <AdminCoaches path="/coaches" />
      <AdminCategories path="/categorias" />
      <AdminSingleCategory path="/categorias/:class_category_id" />
      <AdminClassTypes path="/tipos" />
      <AdminHome path="/home" />
      <AdminDescuentos path="/descuentos" />
      <AdminEspeciales path="/especiales" />
      <AdminAsistentesEspeciales path="/especiales/:class_package_id" />
      <AdminOrdenes path="/orders" />
      <AdminUsuarios path="/users" />
      <AdminCircuitos path="/circuitos" />
    </Router>
  );
};

export default Admin;
