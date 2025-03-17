const ErrorMessage = (props) => {
    return (
      <div>
        {props.errors === undefined
          ? null
          : props.errors.map((e) => {
              return (
                <p key={e.msg} className="error">
                  {e.msg}s
                </p>
              );
            })}
      </div>
    );
  };
  
  export { ErrorMessage };