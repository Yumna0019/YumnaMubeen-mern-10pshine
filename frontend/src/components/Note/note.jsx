import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Note = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false); 

  useEffect(() => {
    if (!hasShownToast.current && location.state?.toast) {
      toast.success(location.state.toast);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Note Dashboard</h1>
    </div>
  );
};

export default Note;
