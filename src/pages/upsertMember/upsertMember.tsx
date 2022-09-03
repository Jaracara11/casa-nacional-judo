import './UpsertProduct.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { signInValidation } from '../../utils/validations';

export const UpsertMember = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const initialValues = {
    productName: '',
    categoryId: 0,
    productCost: 0,
    productStock: 0,
    productDescription: ''
  };
  const validation = ValidationSchema.product;

  useEffect(() => {
    setLoadingData(true);
    const getProductAndCategories = async () => {
      if (params.id) {
        await ProductService.getProductById(params.id)
          .then((response) => {
            setProduct(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      await CategoryService.getAllCategories()
        .then((response) => {
          setCategories(
            response.map((x) => {
              return {
                value: x.categoryId,
                text: x.categoryName
              };
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
      setLoadingData(false);
    };
    getProductAndCategories();
  }, [params.id]);

  const postProduct = (values) => {
    const SwalObj = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-info m-3',
        cancelButton: 'btn btn-outline-dark'
      },
      buttonsStyling: false
    });

    SwalObj.fire({
      title: `${params.id ? 'Update' : 'Save'} Product`,
      html: `Are you sure you want to ${params.id ? 'update' : 'save'} this product?`,
      icon: `${params.id ? 'warning' : 'info'}`,
      showCancelButton: true,
      confirmButtonText: 'SAVE',
      cancelButtonText: 'CANCEL',
      focusCancel: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingData(true);
        values.categoryId = parseInt(values.categoryId);
        if (params.id) {
          try {
            ProductService.updateProduct(params.id, values);
            SwalObj.fire({
              html: `Product Updated!`,
              icon: 'info',
              showConfirmButton: false
            });
            setLoadingData(false);
          } catch (err) {
            setLoadingData(false);
            SwalObj.fire({
              title: 'Product Not Saved!',
              html: `${err.response.data.title}`,
              icon: 'error',
              showConfirmButton: false
            });
          }
        } else {
          try {
            ProductService.createProduct(values);
            SwalObj.fire({
              html: `Product Saved!`,
              icon: 'success',
              showConfirmButton: false
            }).then(() => {
              navigate('/');
            });
          } catch (err) {
            setLoadingData(false);
            SwalObj.fire({
              title: 'Product Not Created!',
              html: `${err.response.data.title}`,
              icon: 'error',
              showConfirmButton: false
            });
          }
        }
      }
    });
  };

  return loadingData ? (
    <Spinner />
  ) : (
    categories && (
      <Formik initialValues={params.id ? product : initialValues} validationSchema={validation} onSubmit={postProduct}>
        <Form>
          <h1>{params.id ? 'Edit' : 'Add'} Product</h1>
          <div className='form-control'>
            <div className='form-group m-3'>
              <FormikControl control='input' type='text' label='Product Name:' name='productName' />
            </div>
            <div className='form-group m-3'>
              <FormikControl control='select' label='Product Category:' name='categoryId' options={categories} />
            </div>
            <div className='form-group m-3'>
              <FormikControl control='input' type='number' label='Product Cost:' name='productCost' />
            </div>
            <div className='form-group m-3'>
              <FormikControl control='input' type='number' label='Product Stock:' name='productStock' />
            </div>
            <div className='form-group m-3'>
              <FormikControl as='textarea' cols='2' rows='4' control='input' type='text' label='Product Description:' name='productDescription' />
            </div>
            <div className='form-group m-3'>
              <NavigateButton route={'/'} className='btn btn-outline-dark btn-lg' text={'Back'} />
              <button className='btn btn-secondary btn-lg btn-block' type='submit'>
                Save
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    )
  );
};
