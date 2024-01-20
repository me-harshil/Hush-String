"use client";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "bi bi-house",
  },
  {
    title: "Add Product",
    href: "/admin/addproduct",
    icon: "bi bi-plus-circle",
  },
  {
    title: "View Products",
    href: "/admin/allproducts",
    icon: "bi bi-eye",
  },
  {
    title: "Image Uploader",
    href: "/admin/imageuploader",
    icon: "bi bi-upload",
  },
  {
    title: "Orders",
    href: "/admin/allorders",
    icon: "bi bi-cart",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let location = usePathname();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                href={navi.href}
                className={
                  location === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
